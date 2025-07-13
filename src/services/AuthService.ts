import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

export interface User {
  id: string;
  username: string;
  password: string;
}

// Create new user
export async function signup(username: string, password: string): Promise<User> {
  const response = await axios.post<User>(API_URL, { username, password });
  return response.data;
}

// Login (verify email & password)
export async function login(username: string, password: string): Promise<User> {
  const response = await axios.get<User[]>(`${API_URL}?username=${username}`);
  if (response.data.length === 0) {
    throw new Error('User not found');
  }
  const user = response.data[0];
  if (user.password !== password) {
    throw new Error('Incorrect password');
  }
  return user;
}