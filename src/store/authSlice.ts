import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice} from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = loadFromLocalStorage();

function loadFromLocalStorage(): AuthState {
  try {
    const serialized = localStorage.getItem('auth');
    if (serialized === null) return { user: null, isAuthenticated: false };
    return JSON.parse(serialized) as AuthState;
  } catch (e) {
    return { user: null, isAuthenticated: false };
  }
}

function saveToLocalStorage(state: AuthState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('auth', serialized);
  } catch (e) {
    console.error('Could not save auth state to localStorage', e);
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveToLocalStorage(state);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      saveToLocalStorage(state);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
