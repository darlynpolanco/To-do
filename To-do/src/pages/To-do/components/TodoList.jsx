// src/components/TodoApp/TodoList.jsx
import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit, loading }) => {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            loading={loading}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;