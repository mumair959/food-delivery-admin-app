import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Router } from '@angular/router';

import  { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'All Orders',
      url: '/orders',
      icon: 'clipboard'
    },
    {
      title: 'New Orders',
      url: '/new-orders',
      icon: 'gift'
    },
    // {
    //   title: 'Cancelled Orders',
    //   url: '/cancelled-orders',
    //   icon: 'close-circle'
    // },
    // {
    //   title: 'Delivered Orders',
    //   url: '/delivered-orders',
    //   icon: 'bicycle'
    // },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
  ) {
    this.initializeApp();
  }

  logoutApp(){
    this.menuCtrl.close();
    this.authService.logout();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        if(localStorage.getItem('auth_user')){
          this.authService.sendFCMTokenToServer(token);
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        if(localStorage.getItem('auth_user')){
          this.authService.sendFCMTokenToServer(token);
        }
      });


      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });
    });

    this.authService.authState.subscribe(state => {
      if (state) {
        this.router.navigate(['new-orders']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
