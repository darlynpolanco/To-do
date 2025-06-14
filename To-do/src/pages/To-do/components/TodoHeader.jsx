// src/components/TodoApp/TodoHeader.jsx
import { List, LogOut, User } from 'lucide-react';

const TodoHeader = ({ user, onLogout, todos }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <List size={28} /> Gestor de Tareas
      </h2>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500">
          {todos.filter((t) => !t.completada).length} pendientes de {todos.length}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <User size={16} className="text-blue-600" />
            <span className="text-blue-600 text-sm font-medium">{user?.nombre || 'Usuario'}</span>
          </div>
          <button 
            onClick={onLogout}
            className="px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoHeader;
