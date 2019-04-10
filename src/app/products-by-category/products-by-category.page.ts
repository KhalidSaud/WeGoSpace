import { Component, OnInit, Inject } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
})
export class ProductsByCategoryPage implements OnInit {


  products: any;
  page: number;
  category_slug: any;
  category_name: any;

  constructor(
    private apiServices: ApiService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
    ) {

    this.page = 1;

    this.category_name = apiServices.getCurrentCategory();

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('categorySlug')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      const temp: any = paramMap;
      this.category_slug = temp.params.categorySlug;
      this.getCategories();
    });
   }

  ngOnInit() {
  }

  getCategories() {
    let header = new HttpHeaders();
    header = this.apiServices.createAuthorizationHeader(header);
    for(let page = 1; page <= 5; page++) {
      // tslint:disable-next-line: max-line-length
      this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/products?filter[category]=' + this.category_slug + '&per_page=10&page=' + page + '&lang=en', {headers: header}).subscribe( data => {
        this.products = data;
      }, async err => {
        console.log(err);
      });
    }
  }

}
