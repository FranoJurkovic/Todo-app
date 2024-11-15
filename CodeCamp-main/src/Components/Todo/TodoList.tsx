import React, { useState, useEffect } from 'react';
import { TodoItem } from './TodoItems';
import './TodoList.css';

// Definicija Todo interfejsa
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  const userId = loggedInUser?.id;

  // Učitaj zadatke i kategorije iz lokalne pohrane
  useEffect(() => {
    if (userId) {
      const storedTodos = localStorage.getItem(`todos_${userId}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }

      const storedCategories = localStorage.getItem(`categories_${userId}`);
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        // Postavljanje početnih kategorija ako nisu pohranjene
        setCategories(['Posao', 'Osobno', 'Škola', 'Ostalo']);
      }
    }
  }, [userId]);

  // Spremanje zadataka i kategorija u lokalnu pohranu svaki put kad se promijene
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
      localStorage.setItem(`categories_${userId}`, JSON.stringify(categories));
    }
  }, [todos, categories, userId]);

  // Funkcija za dodavanje zadatka
  const handleAddTodo = () => {
    if (newTodo.trim() !== '' && category.trim() !== '') {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        category: category,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setCategory('');
    }
  };

  // Funkcija za dodavanje nove kategorije
  const handleAddCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  // Funkcija za filtriranje zadataka prema kategoriji
  const filterTodosByCategory = (category: string) => {
    return todos.filter((todo) => todo.category === category);
  };

  return (
    <div className="todo-container">

      {/* Polje za unos nove kategorije */}
      <input
        type="text"
        placeholder="Dodaj novu kategoriju"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Dodaj kategoriju</button>
      <br />
      <hr></hr>
      <br />
      {/* Odabir kategorije */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Izaberite kategoriju</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Unos novog zadatka */}
      <br/>
      <input
        type="text"
        placeholder="Dodaj novi zadatak"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Dodaj zadatak</button>
      <hr />  
      {/* Prikazivanje liste zadataka filtriranih prema kategoriji */}
      <ul>
        {todos.length === 0 ? (
          <li>Nema raspoloživih zadataka.</li>
        ) : (
          filterTodosByCategory(category).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => setTodos(todos.filter((item) => item.id !== todo.id))}
              onToggleComplete={() => setTodos(todos.map((item) => item.id === todo.id ? { ...item, completed: !item.completed } : item))}
            />
          ))
        )}
      </ul>
    </div>
  );
};