import { Injectable } from '@angular/core';
import { Storage  } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: string[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const storedCategories = await this._storage.get('categories');
    this.categories = storedCategories || [];
  }

  async getCategories(): Promise<string[]> {
    return this.categories;
  }

  addCategory(name: string) {
    if (!this.categories.includes(name)) {
      this.categories.push(name);
      this.saveCategories();
    }
  }

  deleteCategory(name: string) {
    this.categories = this.categories.filter(cat => cat !== name);
    this.saveCategories();
  }

  private saveCategories() {
    this._storage?.set('categories', this.categories);
  }
}
