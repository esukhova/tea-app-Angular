import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {OrderService} from "../../shared/services/order.service";

declare let $: any;

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  private productSubscription: Subscription | null = null;
  private orderSubscription: Subscription | null = null;
  status: number = 0;
  touchedSubmitButton: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private orderService: OrderService) {
  }

  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[а-яА-ЯёЁ]+(?:[ -][а-яА-ЯёЁ]+)*$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яА-ЯёЁ]+(?:[ -][а-яА-ЯёЁ]+)*$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    product: [''],
    address: ['', [Validators.required, Validators.pattern('^[а-яА-Я0-9- /]+$')]],
    comment: ['']
  });

  get name() {
    return this.orderForm.get('name')
  };

  get lastName() {
    return this.orderForm.get('last_name')
  };

  get phone() {
    return this.orderForm.get('phone')
  };

  get country() {
    return this.orderForm.get('country')
  };

  get zip() {
    return this.orderForm.get('zip')
  };

  get product() {
    return this.orderForm.get('product')
  };

  get address() {
    return this.orderForm.get('address')
  };

  get comment() {
    return this.orderForm.get(' comment')
  };

  ngOnInit() {
    this.productSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.orderForm.controls['product'].setValue(params['product']);
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }

  createOrder() {
    if (this.name?.value && this.lastName?.value && this.phone?.value && this.country?.value && this.zip?.value && this.product?.value && this.address?.value) {
      this.status = 3;
      this.orderSubscription = this.orderService.createOrder({
        name: this.name.value,
        last_name: this.lastName.value,
        phone: this.phone.value,
        country: this.country.value,
        zip: this.zip.value,
        product: this.product.value,
        address: this.address.value,
        comment: this.comment?.value ? this.comment.value : '',
      })
        .subscribe({
          next: (response) => {
            if (response.success === 1) {
              this.status = 1;
            }
          },
          error: (error) => {
            console.log(error);
            this.status = 2;
            setTimeout(()=> {
              this.status = 0;
            }, 3000);
          }
        })
    } else {
      this.touchedSubmitButton = true;
    }
  }

  capitalizeWords(controlName: string):void {
    const control = this.orderForm.get(controlName);
    const value = control?.value;
    if (!value) {
      return;
    }

    const capitalized = value.split(' ').map((word: string)=> word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    control?.setValue(capitalized, { emitEvent: false });
  }

  onlyDigits(controlName: string): void {
    const control = this.orderForm.get(controlName);
    control?.setValue((control?.value || '').replace(/\D/g, ''), { emitEvent: false });
  }

  onlyDigitsAndPlus(controlName: string): void {
    const control = this.orderForm.get(controlName);
    if (!control) {
      return;
    }

    let value = (control.value || '').replace(/[^\d+]/g, '');
    if (value.startsWith('+')) {
      value = '+' + value.slice(1).replace(/\+/g, '');
    } else {
      value = value.replace(/\+/g, '');
    }
    control.setValue(value, { emitEvent: false });
  }
}
