// src/pages/To-do/components/Sidebar.jsx
import { motion } from 'framer-motion';
import { ListTodo, LogOut, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="w-64 bg-white dark:bg-gray-800 shadow-xl p-6 space-y-6 hidden md:block"
    >
      <h2 className="text-xl font-bold text-blue-600 dark:text-white">📌 DoDo</h2>
      <nav className="space-y-4">
        <button
          onClick={() => navigate('/todos')}
          className="flex items-center gap-3 text-gray-800 dark:text-white hover:text-blue-600 transition"
        >
          <ListTodo className="w-5 h-5" /> Tareas
        </button>
        <button
          onClick={() => navigate('/pomodoro')}
          className="flex items-center gap-3 text-gray-800 dark:text-white hover:text-blue-600 transition"
        >
          <Timer className="w-5 h-5" /> Pomodoro
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="flex items-center gap-3 text-red-500 hover:text-red-600 transition pt-6"
        >
          <LogOut className="w-5 h-5" /> Cerrar sesión
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;