import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ShowToastService } from '../services/toast/show-toast.service';
import { OrderDataService } from '../services/order/order-data.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-orders',
  templateUrl: './delivered-orders.page.html',
  styleUrls: ['./delivered-orders.page.scss'],
})
export class DeliveredOrdersPage implements OnInit {
  public orders:any = [];
  constructor(private router: Router,private menuCtrl: MenuController, private loadingService: LoadingService, 
    private showToast: ShowToastService,private orderService: OrderDataService) { }

    viewDetail(order){
      let navigationExtras: NavigationExtras = {
        queryParams: {order_id: order.id}
      };
      this.router.navigate(['order-detail'],navigationExtras);
    }

    ngOnInit() {
      this.loadingService.present();
      this.menuCtrl.enable(true);
      this.orderService.getDeliveredOrders().subscribe((data:any) => {
        console.log(data);
        if(!data.msg){
          this.orders = data.orders;        
        }
        this.loadingService.dismiss();
      }, err => { this.loadingService.dismiss(); });
    }

}
