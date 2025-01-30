import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchSubject$ = new Subject<string>;
  inputValue: string = '';

  constructor() { }

  search(value?: string) {
    this.searchSubject$.next(value ? value : '');
    this.inputValue = value ? value : '';

  }
}
