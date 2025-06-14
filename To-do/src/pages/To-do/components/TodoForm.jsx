// src/components/TodoApp/TodoForm.jsx
import { useState } from 'react';
import { Plus, Loader, CheckCircle2 } from 'lucide-react';

const TodoForm = ({ token, fetchTodos, setError }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ titulo: '', contenido: '', prioridad: 'media' });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    if (!form.titulo.trim()) {
      setError('❌ El título es obligatorio');
      return false;
    }
    if (!form.contenido.trim()) {
      setError('❌ El contenido es obligatorio');
      return false;
    }
    if (!form.prioridad.trim()) {
      setError('❌ La prioridad es obligatoria');
      return false;
    }
    return true;
  };

  const addTodo = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('https://localhost:7089/api/Todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ todo: form }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear la tarea');
      }

      setForm({ titulo: '', contenido: '', prioridad: 'media' });
      setShowModal(false);
      setSuccessMsg('✅ ¡Tarea creada con éxito!');
      await fetchTodos();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Error al crear tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-lg hover:from-emerald-500 hover:to-green-600 transition flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Añadir nueva tarea
      </button>

      {successMsg && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg shadow flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-blue-700">🆕 Nueva Tarea</h2>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="📝 Título"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            <textarea
              value={form.contenido}
              onChange={(e) => setForm({ ...form, contenido: e.target.value })}
              placeholder="📋 Contenido..."
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            ></textarea>
            <select
              value={form.prioridad}
              onChange={(e) => setForm({ ...form, prioridad: e.target.value })}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              <option value="alta">🔥 Alta</option>
              <option value="media">⚠️ Media</option>
              <option value="baja">🧊 Baja</option>
            </select>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={addTodo}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
