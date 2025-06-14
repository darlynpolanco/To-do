import { motion } from 'framer-motion';
import { Check, Edit3, Trash2 } from 'lucide-react';

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case 'alta': return 'bg-red-100 text-red-600 border-red-200';
    case 'media': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    case 'baja': return 'bg-green-100 text-green-600 border-green-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

const getPriorityLabel = (priority) => {
  switch (priority.toLowerCase()) {
    case 'alta': return '🔥 Alta';
    case 'media': return '⚠️ Media';
    case 'baja': return '🧊 Baja';
    default: return priority;
  }
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow transition-all ${
        todo.completada ? 'opacity-70' : ''
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        disabled={loading}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors disabled:opacity-50 ${
          todo.completada
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {todo.completada && <Check className="w-4 h-4" />}
      </button>
      <div className="flex-1 min-w-0">
        <span className={`block text-lg font-medium truncate ${todo.completada ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.titulo}
        </span>
        {todo.contenido && (
          <p className="text-sm text-gray-600 mt-1 truncate">
            {todo.contenido}
          </p>
        )}
        <div className="text-xs text-gray-500 mt-1">
          🕓 {new Date(todo.fechaCreacion).toLocaleString()}
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(todo.prioridad)}`}>
        {getPriorityLabel(todo.prioridad)}
      </span>
      <button onClick={() => onEdit(todo.id)} disabled={loading} className="text-blue-500 hover:text-blue-700 transition">
        <Edit3 className="w-4 h-4" />
      </button>
      <button onClick={() => onDelete(todo.id)} disabled={loading} className="text-red-500 hover:text-red-700 transition">
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TodoItem;
