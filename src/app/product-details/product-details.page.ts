import { HomePage } from './../home/home.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NavParams, NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product: any;

  constructor(private activatedRoute: ActivatedRoute, private apiServices: ApiService, private navCtrl: NavController) {
    // let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    // this.apiServices.getProductById(productId).subscribe( productObj => {
    // });

    this.product = this.apiServices.getCurrentProduct();

    if (this.product) {
      console.log(this.product);
    } else {
      console.log('no');
      this.navCtrl.navigateBack('home');
      return;
    }
   }

  ngOnInit() {
  }

}
