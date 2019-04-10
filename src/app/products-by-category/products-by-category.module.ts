import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductsByCategoryPage } from './products-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsByCategoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductsByCategoryPage]
})
export class ProductsByCategoryPageModule {}
