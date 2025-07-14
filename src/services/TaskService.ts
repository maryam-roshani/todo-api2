import axios from 'axios';
import { Task } from '../types/Task';

const BASE_URL = 'http://localhost:3001/tasks';

export const getTasks = async (userId: string): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${BASE_URL}?userId=${userId}`);
  return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await axios.post<Task>(BASE_URL, task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put<Task>(`${BASE_URL}/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
