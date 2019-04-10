import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  private _allCurrentProducts: any;
  private _currentProduct: any;
  private _currentCategory: any;

  constructor(private http: HttpClient) { }

  getCurrentProduct() {
    return this._currentProduct;
  }

  setCurrentProduct(data: any) {
    this._currentProduct = data;
  }

  getCurrentCategory() {
    return this._currentCategory;
  }

  setCurrentCategory(data: any) {
    this._currentCategory = data;
  }

  // Not Used
  getAllProducts(query: string) {
    let header = new HttpHeaders();
    header = this.createAuthorizationHeader(header);
    return this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/' + query, {headers: header});
  }

  getCategories() {
    let header = new HttpHeaders();
    header = this.createAuthorizationHeader(header);
    this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/products/categories?lang=en', {headers: header}).subscribe( data => {
      return data;
    }, async err => {
      console.log(err);
    });
  }

  getProductById(id: string) {
    let header = new HttpHeaders();
    header = this.createAuthorizationHeader(header);
    return this.http.get('https://www.12.wegospace.com/wp-json/wc/v2/products/' + id + '?lang=en', {headers: header})
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    return headers.append('Authorization', 'Basic ' +
    btoa('ck_ce79c12d708e5a23f68342d777e2725a143c8ef0:cs_718b06473bf42acf34767ecfcc221d977a2fa46d'));
  }

}
