import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ShowToastService } from '../toast/show-toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  apiUrl = 'https://www.pohnchadoo.pk/api/';
  constructor(private router: Router,private storage: Storage, private platform: Platform, 
    private showToast: ShowToastService, private http: HttpClient, private loadingService: LoadingService) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

   ifLoggedIn() {
    let response = localStorage.getItem('auth_user');
    if (response) {
      this.authState.next(true);
    }
  }
 
  login(user) {
    this.loadingService.present();
    let headers = new HttpHeaders();
    this.http.post(this.apiUrl+'admin_login',user,{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json'}}).subscribe(data => {
      console.log(data);
      localStorage.setItem('auth_user', JSON.stringify(data));
      this.router.navigate(['orders']);
      this.authState.next(true);
      this.loadingService.dismiss();
    }, err => {
      this.loadingService.dismiss();      
      if(err.error.message){
        this.showToast.toast(err.error.message);
      }
      else if(err.error.msg){
        this.showToast.toast(err.error.msg);
      }
      else{
        let errors = [];
        let errorArray = Object.values(err.error.error);

        errorArray.forEach(elem => { errors.push(elem[0]); });

        this.showToast.toast(errors.join());
      }
    });
  }
 
  logout() {
    this.loadingService.present();
    let auth_user = JSON.parse(localStorage.getItem('auth_user'));
    
    this.http.post(this.apiUrl+'logout',{user_id : auth_user.user_id},{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}}).subscribe((data:any) => {
      this.loadingService.dismiss();
      if (data.success){
        this.showToast.toast(data.success);
        localStorage.removeItem('auth_user');
        this.router.navigate(['login']);
        this.authState.next(false);
      }
      
    }, err => {
      this.loadingService.dismiss();
      this.showToast.toast('Unauthorized');
    });
  }

  sendFCMTokenToServer(token) {
    let auth_user = JSON.parse(localStorage.getItem('auth_user'));
    
    this.http.post(this.apiUrl+'send_fcm_token',{user_id : 7,fcm_token : token},{headers : {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : auth_user.token_type+' '+auth_user.access_token}}).subscribe((data:any) => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
 
  isAuthenticated() {
    return this.authState.value;
  }
}
