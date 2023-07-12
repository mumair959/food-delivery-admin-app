import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule', canActivate: [AuthGuardService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'order-detail', loadChildren: './order-detail/order-detail.module#OrderDetailPageModule',canActivate: [AuthGuardService] },
  { path: 'new-orders', loadChildren: './new-orders/new-orders.module#NewOrdersPageModule', canActivate: [AuthGuardService] },
  { path: 'cancelled-orders', loadChildren: './cancelled-orders/cancelled-orders.module#CancelledOrdersPageModule', canActivate: [AuthGuardService] },
  { path: 'delivered-orders', loadChildren: './delivered-orders/delivered-orders.module#DeliveredOrdersPageModule', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
