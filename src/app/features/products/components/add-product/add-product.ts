import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProductComponent {
  name: string = '';
  price: number | null = null;
  description: string = '';
  quantity: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct(): void {
    if (this.isFormValid()) {
      const newProduct = {
        name: this.name,
        price: this.price as number,
        description: this.description,
        quantity: this.quantity as number,
      };

      this.productService.addProduct(newProduct);
      this.router.navigate(['/']);
    } else {
      this.showErrorMessage();
    }
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.price !== null &&
      this.price > 0 &&
      this.description.trim() !== '' &&
      this.quantity !== null &&
      this.quantity > 0
    );
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  showSuccessMessage(): void {
    this.successMessage = 'Product added successfully!';
    this.errorMessage = '';
  }

  showErrorMessage(): void {
    this.errorMessage = 'Please fill in all fields with valid values.';
    this.successMessage = '';
  }
}
