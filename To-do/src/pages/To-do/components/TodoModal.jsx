// src/components/TodoApp/TodoModal.jsx
import { Loader } from 'lucide-react';

const TodoModal = ({
  editingTodo,
  setEditingTodo,
  editForm,
  setEditForm,
  updateTodo,
  loading,
  priorities = []
}) => {
  const getPriorityLabel = (priority) => {
    switch (priority.toLowerCase()) {
      case 'alta': return '🔥 Alta';
      case 'media': return '⚠️ Media';
      case 'baja': return '🧊 Baja';
      default: return priority;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Editar Tarea</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            value={editForm.titulo}
            onChange={(e) => setEditForm({...editForm, titulo: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={editForm.contenido}
            onChange={(e) => setEditForm({...editForm, contenido: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
          <select
            value={editForm.prioridad}
            onChange={(e) => setEditForm({...editForm, prioridad: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{getPriorityLabel(p)}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setEditingTodo(null)}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={updateTodo}
            disabled={loading || !editForm.titulo.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;