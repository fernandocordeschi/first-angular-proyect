import { Component } from '@angular/core';
import { Products } from './products';
import { VucumpraCartService } from '../vucumpra-cart.service';
import { ProducDataService } from '../product-data.service'; 

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  // Lista que guarda los productos obtenidos del backend y que se muestran en pantalla
  products: Products[] = [];

  constructor(
    private cart: VucumpraCartService,
    private productDataService: ProducDataService 
  ) {
    // Suscripción que se activa cuando se vacía el carrito.
    // Sirve para devolver al stock los productos eliminados del carrito.
    this.cart.clearCart$.subscribe((productosRestaurados) => {
      for (const eliminado of productosRestaurados) {
        // Busca el producto original en la lista
        const original = this.products.find(p => p.name === eliminado.name);
        if (original) {
          // Suma la cantidad eliminada al stock original
          original.stock = Number(original.stock) + Number(eliminado.quantity);
          // Reinicia la cantidad seleccionada a cero
          original.quantity = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    // Cuando el componente se inicializa, se piden los productos desde el servicio (API o mock)
    this.productDataService.getAllProducts()
      .subscribe(products => this.products = products); 
  }

  // Función que agrega el producto al carrito si la cantidad es válida,
  // y actualiza el stock descontando lo agregado
  addToCart(product: Products): void {
    // Verifica que se haya elegido una cantidad positiva y que haya suficiente stock
    if (product.quantity > 0 && product.quantity <= product.stock) {
      const copia = { ...product }; // Se clona el objeto para que el carrito no modifique el original
      this.cart.addToCart(copia);   // Se manda la copia al carrito
      product.stock -= product.quantity; // Se descuenta esa cantidad del stock original
      product.quantity = 0; // Se reinicia la cantidad seleccionada
    } else {
      // Si la cantidad es inválida (negativa, cero o mayor al stock), se muestra un mensaje de error
      alert("Cantidad inválida o sin stock disponible. Máximo disponible: " + product.stock);
    }
  }

// Función que elimina un producto de la lista y del backend (simulado)
 deleteProduct(id: number): void {
  let nombreProducto = this.products.find(p => p.id === id)?.name || 'desconocido';
  if (confirm(`¿Estás seguro de eliminar el producto con nombre= ${nombreProducto}?`)) {
    this.productDataService.deleteProduct(id).subscribe({
      next: () => {
        alert(`Producto con ID ${id} y el nombre = ${nombreProducto} eliminado correctamente.`);
        this.products = this.products.filter(p => p.id !== id); // Actualizar la lista
      },
      error: err => {
        alert('No se pudo eliminar el producto. Error: ' + err.message);
      }
    });
  }
}


}
