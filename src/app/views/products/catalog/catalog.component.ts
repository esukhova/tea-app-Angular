import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {Router} from "@angular/router";
import {Observable, Subject, Subscription, tap} from "rxjs";
import {SearchService} from "../../../shared/services/search.service";

declare let $: any;

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  productsSubscription: Subscription | null = null;
  searchSubscription: Subscription | null = null;
  loading: boolean = false;
  status: number = 1;
  inputValue: string = '';

  constructor(private productService: ProductService,
              private searchService: SearchService,
              private router: Router) {
  }

  ngOnInit() {
    this.getProducts(this.searchService.inputValue ? this.searchService.inputValue : '');

    this.searchSubscription = this.searchService.searchSubject$
      .subscribe((value) => {
        this.loading = true;
        this.getProducts(value);
      });
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  getProducts(value: string) {
    this.loading = true;
    this.productsSubscription = this.productService.getProducts(value)
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (products) => {
          if (value) {
            if (products && products.length > 0) {
              this.products = products;
              this.status = 2;
              this.inputValue = value;
            } else {
              this.products = [];
              this.status = 0;
            }
          } else {
            if (products && products.length > 0) {
              this.products = products;
              this.status = 1;
            } else {
              this.status = 0;
            }
          }
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      })
  }
}
