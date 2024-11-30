import React, { useState, useEffect, useCallback } from 'react';
import './TaskList.css';
import { Task } from '../../Types/Task';

interface TaskListProps {
  user: string;
}

export const TaskList: React.FC<TaskListProps> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasksAndCategories = useCallback(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedCategories = localStorage.getItem('categories');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    fetchTasksAndCategories();
  }, [fetchTasksAndCategories]);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const saveCategoriesToLocalStorage = (categories: string[]) => {
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  const handleAddTask = () => {
    if (!category.trim()) {
      setErrorMessage("Trebate odabrati kategoriju kako bi dodali zadatak.");
      return;
    }
    if (newTaskTitle.trim() === '') {
      setErrorMessage("Unesite naslov zadatka.");
      return;
    }
    if (newTaskDescription.trim() === '') {
      setErrorMessage("Unesite opis zadatka.");
      return;
    }

    const newTask: Task = {
      id: new Date().toISOString(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      category: category,
      userID: user,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setErrorMessage("");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      setCategoryErrorMessage("Unesite ime kategorije.");
      return;
    }
    if (!categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      saveCategoriesToLocalStorage(updatedCategories);
      setNewCategory('');
      setCategoryErrorMessage("");
    }
  };

  const handleDeleteCategory = (index: number) => {
    const categoryToDelete = categories[index];

    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    saveCategoriesToLocalStorage(updatedCategories);

    const updatedTasks = tasks.filter(task => task.category !== categoryToDelete);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const filterTasksByCategory = (category: string) => {
    return tasks.filter((task) => task.category === category);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? editingTask : task
      );
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setEditingTask(null);
    }
  };

  const handleEditChange = (field: keyof Task, value: string) => {
    if (editingTask) {
      setEditingTask({ ...editingTask, [field]: value });
    }
  };

  return (
    <div className="task-container">
      <input
        type="text"
        placeholder="Dodaj novu kategoriju"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Dodaj kategoriju</button>
      {categoryErrorMessage && <p style={{ color: "red" }}>{categoryErrorMessage}</p>}
      <br />
      <hr />
      <br />
      {categories.length > 0 && <h2 className='naslovi'>Kategorije:</h2>}
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            {cat}
            <button onClick={() => handleDeleteCategory(index)} style={{ marginLeft: '10px' }}>
              Izbriši
            </button>
          </li>
        ))}
      </ul>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Izaberite kategoriju</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <br />
      <input
        type="text"
        placeholder="Dodaj novi zadatak"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Opis zadatka"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Dodaj zadatak</button>
      <hr />
      {category && filterTasksByCategory(category).length > 0 && <h2 className='naslovi'>Zadaci:</h2>}
      <ul>
        {category ? (
          filterTasksByCategory(category).length === 0 ? (
            <li>Nema raspoloživih zadataka.</li>
          ) : (
            filterTasksByCategory(category).map((task) => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <div className="task-text">
                  <h1 className='kategorija'>{task.category}</h1>
                  <hr />
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id!)}
                />
                <button onClick={() => handleEditTask(task)} style={{ marginRight: '10px' }}>
                  Uredi
                </button>
                <button className="delete" onClick={() => handleDeleteTask(task.id!)}>
                  Obriši
                </button>
              </li>
            ))
          )
        ) : (
          <li>Izaberite kategoriju za prikaz zadataka.</li>
        )}
      </ul>

      {editingTask && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2 className='zadatak'>Uredi zadatak</h2>
            <select
              value={editingTask.category}
              onChange={(e) => handleEditChange('category', e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label htmlFor="title">Naslov:</label>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) => handleEditChange('title', e.target.value)} id='title' name='title'
            /><br />
            <label htmlFor="opis">Opis:</label>
            <input
              type="text"
              value={editingTask.description}
              onChange={(e) => handleEditChange('description', e.target.value)} id='opis' name='opis'
            />
            <button onClick={handleSaveTask}>Spremi</button>
            <button onClick={() => setEditingTask(null)}>Odustani</button>
          </div>
        </div>
      )}
    </div>
  );
};