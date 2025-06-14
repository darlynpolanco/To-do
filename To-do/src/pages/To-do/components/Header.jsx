// src/pages/To-do/components/Header.jsx
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between"
        >
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            ✨ Bienvenido a tu espacio de tareas
        </h1>
        </motion.header>
    );
};

export default Header;