import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveredOrdersPage } from './delivered-orders.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveredOrdersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveredOrdersPage]
})
export class DeliveredOrdersPageModule {}
