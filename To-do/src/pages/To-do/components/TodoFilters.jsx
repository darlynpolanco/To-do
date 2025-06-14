import { ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';
import { useState } from 'react';

const TodoFilters = ({
  searchTerm, setSearchTerm,
  priorityFilter, setPriorityFilter,
  priorities, sortField, sortDirection,
  setSortField, toggleSort
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const getPriorityLabel = (priority) => {
    switch (priority.toLowerCase()) {
      case 'alta': return '🔥 Alta';
      case 'media': return '⚠️ Media';
      case 'baja': return '🧊 Baja';
      default: return priority;
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-gray-700 font-medium mb-2">
        {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        <Filter size={18} /> Filtros y Ordenamiento
      </button>
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Buscar tareas..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">🎯 Todas</option>
              {priorities.map((p) => (
                <option key={p} value={p}>{getPriorityLabel(p)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
            <div className="flex gap-2">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="fechaCreacion">🕓 Fecha</option>
                <option value="prioridad">🚦 Prioridad</option>
              </select>
              <button
                onClick={() => toggleSort(sortField)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                {sortDirection === 'asc' ? '⬆️' : '⬇️'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilters;
