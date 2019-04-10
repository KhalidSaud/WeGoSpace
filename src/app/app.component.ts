import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  categories: any[];

  consumerKey = 'ck_ce79c12d7t08e5a23f68342d777e2725a143c8ef0';
  consumerSecret = 'cs_718b06473bf42acf34767ecfcc221d977a2fa46d';
  credentials = 'Basic ' + this.consumerKey + ':' + this.consumerSecret;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiServices: ApiService,
    private http: HttpClient
  ) {
    this.initializeApp();
    this.categories = [];
    this.getCategories();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getCategories() {
    let header = new HttpHeaders();
    header = this.apiServices.createAuthorizationHeader(header);
    for(let page = 1; page <= 5; page++) {
      // tslint:disable-next-line: max-line-length
      this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/products/categories?per_page=100&page=' + page + '&lang=en', {headers: header}).subscribe( data => {
        let temp: any = data;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].parent === 0) {
            this.categories.push(temp[i]);
          }
        }
      }, async err => {
        console.log(err);
      });
    }
  }

  goToCategoryPage(category_name) {
    this.apiServices.setCurrentCategory(category_name);
  }
}
