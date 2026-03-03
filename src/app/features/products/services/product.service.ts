import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop', quantity: 5 },
    { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse', quantity: 15 },
    { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard', quantity: 10 },
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  public products$ = this.productsSubject.asObservable();

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
    const newProduct: Product = { ...product, id: newId };
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);
  }

  updateProduct(id: number, updatedProduct: Omit<Product, 'id'>): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.productsSubject.next([...this.products]);
    }
  }

  deleteProduct(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsSubject.next([...this.products]);
    }
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new Observable(observer => {
      const product = this.products.find(p => p.id === id);
      observer.next(product);
      observer.complete();
    });
  }
}
