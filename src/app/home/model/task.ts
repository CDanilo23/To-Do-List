export interface Task {
    id: number;
    title: string;
    category?: string; // Categoría opcional
    completed: boolean;
  }