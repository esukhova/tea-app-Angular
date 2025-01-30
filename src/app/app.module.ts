import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/pages/main/main.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { ProductComponent } from './components/pages/product/product.component';
import { OrderComponent } from './components/pages/order/order.component';
import { FooterComponent } from './components/common/footer/footer.component';
import {HeaderComponent} from "./components/common/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import { ProductCardComponent } from './components/common/product-card/product-card.component';
import { TextCutPipe } from './pipes/text-cut.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderService} from "./services/order.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatalogComponent,
    ProductComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    TextCutPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
