import { IonSlides, ToastController, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
@Injectable()
export class HomePage implements OnInit {

  products: any = [];
  moreProducts: any = [];
  name: string;
  page: number;
  consumerKey = 'ck_ce79c12d7t08e5a23f68342d777e2725a143c8ef0';
  consumerSecret = 'cs_718b06473bf42acf34767ecfcc221d977a2fa46d';
  credentials = 'Basic ' + this.consumerKey + ':' + this.consumerSecret;

  @ViewChild('productsSlider') productsSlider: IonSlides;

  constructor(
    private http: HttpClient,
    public toastCtrl: ToastController,
    private apiServices: ApiService
   ) {

    this.page = 2;

    let header = new HttpHeaders();
    header = this.createAuthorizationHeader(header);
    this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/products?lang=en', {headers: header}).subscribe( data => {

      this.products = data;
    }, async err => {
      console.log(err);
    });

    this.loadMoreProducts(null);

  }

  ngOnInit() {

  }

  getWeGoSpace(query: string) {
    let header = new HttpHeaders();
    header = this.createAuthorizationHeader(header);
    this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/' + query, {headers: header}).subscribe( data => {
      console.log(data);
      this.products = data;
    }, async err => {
      console.log(err);
    });
  }


  createAuthorizationHeader(headers: HttpHeaders) {
    return headers.append('Authorization', 'Basic ' +
    btoa('ck_ce79c12d708e5a23f68342d777e2725a143c8ef0:cs_718b06473bf42acf34767ecfcc221d977a2fa46d'));
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  loadMoreProducts(event) {

    if (event == null){
      this.page = 2;
      this.moreProducts = [];
    } else {
      this.page ++;
    }

    let header = new HttpHeaders();
    header = this.createAuthorizationHeader(header);
    // tslint:disable-next-line: max-line-length
    this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/products?page=' + this.page + '&lang=en', {headers: header}).subscribe( async data => {
      this.moreProducts = this.moreProducts.concat(data);
      const fetchedProducts: any = data;
      if (event != null) {
        event.target.complete();
      }

      if ( fetchedProducts.length < 10 ) {
        // event.enable(false);
        event.target.disabled = true;

        const toast = await this.toastCtrl.create({
          message: 'No more products.',
          duration: 5000
        });
        toast.present();
      }
    }, async err => {
      console.log(err);
    });
  }

  onGoToDetailedPage(product: any) {
    this.apiServices.setCurrentProduct(product);
  }

}
