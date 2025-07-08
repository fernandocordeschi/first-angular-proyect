import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Products } from './products-list/products';

const API_URL = 'https://fakestoreapi.com/products';

@Injectable({
  providedIn: 'root'
})
export class ProducDataService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos de la API y los adapta a la interfaz Products.
   * @returns Un observable que emite un array de productos.
   */
  getAllProducts(): Observable<Products[]> {
    return this.http.get<any[]>(API_URL).pipe(
      map(apiProducts => apiProducts.map(apiProduct => ({
        id: apiProduct.id, // Asignación del ID del producto
        name: apiProduct.title,
        type: apiProduct.category,
        price: apiProduct.price,
        stock: 10, // Valor fijo o lógica propia
        image: apiProduct.image,
        clearance: false,
        quantity: 0
      })))
    );
  }
  
  /**
  * Elimina un producto por su ID usando HTTP DELETE.
  * @param id El ID del producto a eliminar.
  * @returns Un observable con la respuesta de la API.
  */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
