import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: ProductType;
  private queryParamsSubscription: Subscription | null = null;
  private productSubscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productSubscription = this.productService.getProduct(+params['id'])
          .subscribe({
            next: (product) => {
              this.product = product;
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            }
          })
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
    this.productSubscription?.unsubscribe();
  }
}
