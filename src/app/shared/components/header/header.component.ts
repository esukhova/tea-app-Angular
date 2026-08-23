import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchInput = new FormControl('');

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    const value = this.searchInput.value?.trim();
    if (!value) return;
    this.searchService.search(value);
    this.router.navigate(['/catalog']);
  }
}
