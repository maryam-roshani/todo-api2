import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '../types/Task';

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

// Replace with your JSON server URL
const API_URL = 'http://localhost:3001/tasks';

export const fetchTasks = createAsyncThunk<Task[], string>(
  'tasks/fetchTasks',
  async (userId) => {
    const response = await axios.get<Task[]>(`${API_URL}?userId=${userId}`);
    return response.data;
  }
);

export const addTask = createAsyncThunk<Task, Task>(
  'tasks/addTask',
  async (task) => {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  'tasks/deleteTask',
  async (taskId) => {
    await axios.delete(`${API_URL}/${taskId}`);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
