import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Componente raíz de la app
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss' 
})
export class AppComponent {
  title1 = 'VuCumpra'; // Título general de la app
  title = 'CarList de Compas'; // Título del carrito
  quantity = 0; // Contador de cantidad

  // Incrementa la cantidad
  increaseQuantity() {
    this.quantity++;
  }

  // Decrementa la cantidad, pero sin ir por debajo de 0
  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
