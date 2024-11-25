import { Task } from "../../Types/Task";

const TASKS_STORAGE_KEY = 'tasks';

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

export const deleteTask = (taskId: string) => {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks(tasks);
};
