import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { VucumpraAboutComponent } from './vucumpra-about/vucumpra-about.component';
import { CartComponent } from './cart/cart.component';
import { VucumpraProductComponent } from './vucumpra-product/vucumpra-product.component';
import { VucumpraButtonInputComponent } from './vucumpra-button-input/vucumpra-button-input.component';
import { CommonModule } from '@angular/common';
import { VucumpraRegisterComponent } from './vucumpra-register/vucumpra-register.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent, 
    CartComponent,
    VucumpraProductComponent,
    VucumpraAboutComponent,
    VucumpraButtonInputComponent,
    VucumpraRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }