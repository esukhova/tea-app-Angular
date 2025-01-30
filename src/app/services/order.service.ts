import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  createOrder(data: {
    name: string,
    last_name: string,
    phone: string,
    country: string,
    zip: string,
    product: string,
    address: string,
    comment: string
  }) {
    return this.http.post<{success: number, message?: string}>('https://testologia.ru/order-tea', data);
  }
}
