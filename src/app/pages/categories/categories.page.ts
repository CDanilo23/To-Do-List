import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  newCategory: string = '';
  categories: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    try{
      this.categories = await this.categoryService.getCategories();
    }catch (error){
      console.error('Error al cargar las categorías:', error);
    }
  }

  addCategory() {
    if (this.newCategory.trim()) {
      this.categoryService.addCategory(this.newCategory.trim());
      this.newCategory = '';
      this.loadCategories();
    }
  }

  async editCategory(oldCategory: string) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoría',
      inputs: [
        {
          name: 'newName',
          type: 'text',
          value: oldCategory,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.categoryService.deleteCategory(oldCategory);
            this.categoryService.addCategory(data.newName.trim());
            this.loadCategories();
          },
        },
      ],
    });
    await alert.present();
  }

  deleteCategory(category: string) {
    this.categoryService.deleteCategory(category);
    this.loadCategories();
  }

}
