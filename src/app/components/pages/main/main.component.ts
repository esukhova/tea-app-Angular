import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
declare let $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private popup$: Observable<string>;
  private popupSubscription: Subscription | null = null;
  popupShow: boolean = false;

  constructor() {
    this.popup$ = new Observable((observer) => {
      const timeout = setTimeout(()=> {
        observer.next('');
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    })
  }

  ngOnInit(): void {
    $(function () {
      var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
      };
      $("#accordion").accordion({
        icons: icons
      });
    });

    this.popupSubscription = this.popup$.subscribe((text: string)=> {
      this.popupShow = true;
      console.log('popup');
    })
  }

  ngOnDestroy() {
    this.popupSubscription?.unsubscribe();
  }
  popupClose() {
    this.popupShow = false;
  }

}
