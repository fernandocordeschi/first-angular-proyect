import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VucumpraProductComponent } from './vucumpra-product/vucumpra-product.component';
import { VucumpraAboutComponent } from './vucumpra-about/vucumpra-about.component';
const routes: Routes = [
   {
    path: '', 
    component: VucumpraProductComponent
  },
   {
    path:'product',
    component: VucumpraProductComponent
  },
    {
    path:'about',
    component: VucumpraAboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
