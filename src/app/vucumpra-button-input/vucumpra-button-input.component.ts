import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vucumpra-button-input',
  standalone: false,
  templateUrl: './vucumpra-button-input.component.html',
  styleUrl: './vucumpra-button-input.component.scss'
})
export class VucumpraButtonInputComponent {
  @Input() quantity!: number; // Valor actual
  @Input() max!: number;      // Máximo permitido
  @Output() quantityChange = new EventEmitter<number>(); // Emite cambios

  // Cambia el valor manualmente desde el input
  onModelChange(value: string): void {
    const parsed = parseInt(value, 10);
    this.quantity = isNaN(parsed) ? 0 : parsed;
    this.quantityChange.emit(this.quantity);
  }

  // Suma 1
  increaseQuantity(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  // Resta 1
  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
