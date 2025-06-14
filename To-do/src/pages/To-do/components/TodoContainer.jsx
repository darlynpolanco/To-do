// src/components/TodoApp/TodoContainer.jsx
import { useState, useEffect } from 'react';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import TodoList from './TodoList';
import TodoModal from './TodoModal';

const API_URL = 'https://localhost:7089/api/Todo';

const TodoContainer = ({ token, user, onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({ titulo: '', contenido: '', prioridad: 'media' });
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortField, setSortField] = useState('fechaCreacion');
  const [sortDirection, setSortDirection] = useState('desc');
  const [priorities, setPriorities] = useState(['alta', 'media', 'baja']);

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchTerm, priorityFilter, sortField, sortDirection, todos]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/all`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      const mapped = data.map(todo => ({
  ...todo,
  completada: Number(todo.completado) === 1
}));
      setTodos(mapped);
    } catch (err) {
      setError(err.message || 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...todos];
    if (priorityFilter) {
      result = result.filter(todo => todo.prioridad.toLowerCase() === priorityFilter.toLowerCase());
    }
    if (searchTerm) {
      result = result.filter(todo =>
        todo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.contenido || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    result.sort((a, b) => {
      if (sortField === 'fechaCreacion') {
        return sortDirection === 'asc'
          ? new Date(a.fechaCreacion) - new Date(b.fechaCreacion)
          : new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
      }
      if (sortField === 'prioridad') {
        const order = { alta: 1, media: 2, baja: 3 };
        return sortDirection === 'asc'
          ? order[a.prioridad.toLowerCase()] - order[b.prioridad.toLowerCase()]
          : order[b.prioridad.toLowerCase()] - order[a.prioridad.toLowerCase()];
      }
      return 0;
    });
    setFilteredTodos(result);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    try {
      const res = await fetch(`${API_URL}/${id}/${todo.completada ? 'uncomplete' : 'complete'}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al cambiar estado');
      const updatedTodos = todos.map(t => t.id === id ? { ...t, completada: !t.completada } : t);
      setTodos(updatedTodos);
    } catch (err) {
      setError(err.message || 'Error al completar/descompletar');
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('¿Seguro que deseas borrar esta tarea? 🗑️')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al borrar la tarea');
      await fetchTodos();
    } catch (err) {
      setError(err.message || 'Error al borrar');
    } finally {
      setLoading(false);
    }
  };

  const getTodoDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al obtener detalles');
      const data = await res.json();
      setEditingTodo(data);
      setEditForm({ titulo: data.titulo, contenido: data.contenido, prioridad: data.prioridad });
    } catch (err) {
      setError(err.message || 'Error al cargar tarea');
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async () => {
    if (!editForm.titulo.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: editingTodo.id,
          titulo: editForm.titulo,
          contenido: editForm.contenido,
          prioridad: editForm.prioridad,
          completada: editingTodo.completada
        }),
      });
      if (!res.ok) throw new Error('Error al actualizar');
      setEditingTodo(null);
      await fetchTodos();
    } catch (err) {
      setError(err.message || 'Error al guardar cambios');
    } finally {
      setLoading(false);
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <TodoHeader user={user} onLogout={onLogout} todos={todos} />
      <TodoForm loading={loading} setError={setError} token={token} fetchTodos={fetchTodos} />
      <TodoFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        priorities={priorities}
        sortField={sortField}
        sortDirection={sortDirection}
        setSortField={setSortField}
        toggleSort={toggleSort}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={getTodoDetails}
        loading={loading}
      />
      {editingTodo && (
        <TodoModal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          editForm={editForm}
          setEditForm={setEditForm}
          updateTodo={updateTodo}
          loading={loading}
          priorities={priorities}
        />
      )}
    </div>
  );
};

export default TodoContainer;
