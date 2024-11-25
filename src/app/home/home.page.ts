import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Task } from '../home/model/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  newTask: string = '';
  selectedCategory: string | undefined;
  categories: string[] = [];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}


  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async ionViewWillEnter() {
    this.loadCategories();
    this.filterTasks();
  }

  

  async filterTasks() {
    // Si no se ha seleccionado una categoría, mostrar todas las tareas
    if (this.selectedCategory) {
      this.filteredTasks = await this.taskService.getTasks(this.selectedCategory);
    } else {
      this.filteredTasks = await this.taskService.getTasks();
    }
  }

  addTask() {
    
    if (this.newTask.trim()) {
      this.taskService.addTask(this.newTask, this.selectedCategory);
      this.newTask = '';
      this.filterTasks();
    }
  }

  toggleTaskCompletion(id: number) {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.filterTasks();
  }

}
