import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search.service";


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchInput = new FormControl('');

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  search() {
    this.searchService.search(this.searchInput.value ? this.searchInput.value : '');
  }
}
