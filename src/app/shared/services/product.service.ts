import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(value?: string): Observable<ProductType[]> {
    if (value) {
      // return this.http.get<ProductType[]>(environment.apiURL + 'tea?search=' + value);
      return this.http.get<ProductType[]>(environment.apiURL + 'tea').pipe(
        map(products=>
          products.filter(p=> p.title.toLowerCase().includes(value.trim().toLowerCase()))
        )
      );
    } else {
      return this.http.get<ProductType[]>(environment.apiURL + 'tea');
    }
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiURL + 'tea?id=' + id);
  }
}
