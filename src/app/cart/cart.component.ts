import { Component, Input } from '@angular/core';
import { VucumpraCartService } from '../vucumpra-cart.service';
import { Products } from '../products-list/products';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() title: string = 'CarListo de Compras'; // Recibe título desde afuera

  cartList$: Observable<Products[]>;
  totalPrice$: Observable<number>;

  constructor(private cart: VucumpraCartService) {
    // Escucha los productos del carrito
    this.cartList$ = cart.cartList.asObservable();

    // Calcula el total en base al contenido del carrito
    this.totalPrice$ = this.cartList$.pipe(
      map(products => products.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0))
    );
  }

  // Llama al servicio para vaciar el carrito
  clearCart() {
    this.cart.clearCart();
  }
}
