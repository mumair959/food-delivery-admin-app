import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MenuController,ActionSheetController } from '@ionic/angular';

import { ShowToastService } from '../services/toast/show-toast.service';
import { OrderDataService } from '../services/order/order-data.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  public orderDetail:any = {};
  constructor(public router: Router,private menuCtrl: MenuController, private loadingService: LoadingService, private actionSheetCtrl:ActionSheetController, 
    private showToast: ShowToastService,private orderService: OrderDataService,private route: ActivatedRoute) {
   }

  goBack(){
    this.router.navigate(['orders']);
  }

  approveOrder(){
    console.log(this.orderDetail);
    this.loadingService.present();
    this.menuCtrl.enable(true);
    
    this.orderService.approveOrder({id : this.orderDetail.id}).subscribe((data:any) => {
      if(data.msg){
        this.showToast.toast(data.msg);
      }
      this.loadingService.dismiss();
    }, err => { this.loadingService.dismiss(); });
  }

  declineOrder(message){
    console.log(this.orderDetail);
    this.loadingService.present();
    this.menuCtrl.enable(true);
    
    this.orderService.declineOrder({id : this.orderDetail.id, message: message}).subscribe((data:any) => {
      if(data.msg){
        this.showToast.toast(data.msg);
      }
      this.loadingService.dismiss();
    }, err => { this.loadingService.dismiss(); });
  }

  async declineOrderPopup(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select reason for decline',
      buttons: [{
        text: 'Rider not available',
        icon: 'bicycle',
        handler: () => {
          this.declineOrder('Rider not available');
        }
      }, {
        text: 'Items not available',
        icon: 'close-circle',
        handler: () => {
          this.declineOrder('Items not available');
        }
      }, {
        text: 'Service not available in your area',
        icon: 'lock',
        handler: () => {
          this.declineOrder('Service not available in your area');
        }
      }, {
        text: 'All riders are busy',
        icon: 'time',
        handler: () => {
          this.declineOrder('All riders are busy');
        }
      }, {
        text: 'Restaurant is closed',
        icon: 'cube',
        handler: () => {
          this.declineOrder('Restaurant is closed');
        }
      }, {
        text: 'Our service is from 9AM to 12AM',
        icon: 'sunny',
        handler: () => {
          this.declineOrder('Our service is from 9AM to 12AM');
        }
      }, {
        text: 'Your order is less than minimum order criteria',
        icon: 'cash',
        handler: () => {
          this.declineOrder('Your order is less than minimum order criteria');
        }
      }, {
        text: 'Selected deal finished',
        icon: 'cash',
        handler: () => {
          this.declineOrder('Selected deal finished');
        }
      }, {
        text: 'Order cancelled on your request',
        icon: 'cash',
        handler: () => {
          this.declineOrder('Order cancelled on your request');
        }
      }, {
        text: 'Order cancelled due to limited time offer',
        icon: 'cash',
        handler: () => {
          this.declineOrder('Order cancelled due to limited time offer');
        }
      }, {
        text: 'Only one deal allowed',
        icon: 'cash',
        handler: () => {
          this.declineOrder('Only one deal allowed');
        }
      }]
    });
    await actionSheet.present();
  }

  ngOnInit() {
    this.loadingService.present();
    this.menuCtrl.enable(true);
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.orderService.getOrderDetail(params.order_id).subscribe((data:any) => {
        console.log(data.order);
        this.orderDetail = data.order;
        this.loadingService.dismiss();
      }, err => { this.loadingService.dismiss(); });
    });
  }

}
