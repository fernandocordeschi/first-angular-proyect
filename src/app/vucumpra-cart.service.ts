import { Injectable } from '@angular/core';
import { Products } from './products-list/products';
import { BehaviorSubject, Subject } from 'rxjs'; // Para manejar datos reactivos

@Injectable({
  providedIn: 'root'
})
export class VucumpraCartService {
  private _cartList: Products[] = []; // Carrito en memoria

  // Para compartir los productos del carrito entre componentes
  cartList: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>(this._cartList);

  // Emitimos los productos eliminados al vaciar el carrito
  clearCart$: Subject<Products[]> = new Subject<Products[]>();

  constructor() {}

  // Agrega producto al carrito
  addToCart(product: Products) {
    // Ver si ya existe el producto
    let item: Products | undefined = this._cartList.find((v1) => v1.name == product.name);
    if (!item) {
      this._cartList.push({ ...product }); // Lo agregamos si no existe
    } else {
      item.quantity += product.quantity; // Si ya está, sumamos la cantidad
    }
    this.cartList.next(this._cartList); // Actualizamos a los que están suscritos
  }

  // Vacía el carrito
  clearCart() {
    const productosEliminados = [...this._cartList]; // Copiamos antes de vaciar
    this._cartList = [];
    this.cartList.next(this._cartList); // Avisamos del cambio
    this.clearCart$.next(productosEliminados); // Emitimos los eliminados
  }
}
