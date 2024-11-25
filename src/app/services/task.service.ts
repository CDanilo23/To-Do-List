import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../home/model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const storedTasks = await this._storage.get('tasks');
    this.tasks = storedTasks || [];
  }

  async getTasks(category?: string): Promise<Task[]> {
    return category
      ? this.tasks.filter(task => task.category === category)
      : this.tasks;
  }

  addTask(title: string, category?: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      category,
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTaskCompletion(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    this._storage?.set('tasks', this.tasks);
  }
}
