import React from 'react';
import './TodoItems.css';

interface TodoProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    category: string;
  };
  onDelete: () => void;
  onToggleComplete: () => void;
}

export const TodoItem: React.FC<TodoProps> = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span onClick={onToggleComplete}>
        {todo.text} ({todo.category})
      </span>
      <button className="delete" onClick={onDelete}>Obriši</button>
    </li>
  );
};