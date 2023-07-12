import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { ShowToastService } from '../toast/show-toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  apiUrl = 'https://www.pohnchadoo.pk/api/';
  constructor(private router: Router,private storage: Storage, private platform: Platform, 
    private showToast: ShowToastService, private http: HttpClient) { }

    getAllOrders(){
      let headers = new HttpHeaders();
      let auth_user = JSON.parse(localStorage.getItem('auth_user'));

      return this.http.get(this.apiUrl+'admin_get_all_orders',{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}})
    }

    getNewOrders(){
      let headers = new HttpHeaders();
      let auth_user = JSON.parse(localStorage.getItem('auth_user'));

      return this.http.get(this.apiUrl+'admin_get_new_orders',{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}})
    }

    getCancelledOrders(){
      let headers = new HttpHeaders();
      let auth_user = JSON.parse(localStorage.getItem('auth_user'));

      return this.http.get(this.apiUrl+'admin_get_cancelled_orders',{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}})
    }

    getDeliveredOrders(){
      let headers = new HttpHeaders();
      let auth_user = JSON.parse(localStorage.getItem('auth_user'));

      return this.http.get(this.apiUrl+'admin_get_delivered_orders',{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}})
    }

    getOrderDetail(order_id){
      let headers = new HttpHeaders();
      let auth_user = JSON.parse(localStorage.getItem('auth_user'));

      return this.http.get(this.apiUrl+'admin_get_order/'+order_id,{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}})
    }

    approveOrder(order){
      let headers = new HttpHeaders();
      let auth_user = JSON.parse(localStorage.getItem('auth_user'));

      return this.http.post(this.apiUrl+'admin_approve_order',order,{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}})
    }

    declineOrder(order){
      let headers = new HttpHeaders();
      let auth_user = JSON.parse(localStorage.getItem('auth_user'));

      return this.http.post(this.apiUrl+'admin_decline_order',order,{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}})
    }

}
