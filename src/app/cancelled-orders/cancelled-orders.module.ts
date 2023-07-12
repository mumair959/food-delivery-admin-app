import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CancelledOrdersPage } from './cancelled-orders.page';

const routes: Routes = [
  {
    path: '',
    component: CancelledOrdersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CancelledOrdersPage]
})
export class CancelledOrdersPageModule {}
