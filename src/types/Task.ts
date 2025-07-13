export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: 'pending' | 'done';
  priority: 'low' | 'medium' | 'high';
}
