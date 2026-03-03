import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProductComponent implements OnInit, OnDestroy {
  productId: number | null = null;
  name: string = '';
  price: number | null = null;
  description: string = '';
  quantity: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.productId = +params['id']; 
        if (this.productId) {
          this.loadProduct(this.productId);
        }
      });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(product => {
        if (product) {
          this.name = product.name;
          this.price = product.price;
          this.description = product.description;
          this.quantity = product.quantity;
          this.isLoading = false;
        } else {
          this.errorMessage = 'Product not found!';
          this.isLoading = false;
        }
      });
  }

  updateProduct(): void {
    if (this.isFormValid() && this.productId) {
      const updatedProduct = {
        name: this.name,
        price: this.price as number,
        description: this.description,
        quantity: this.quantity as number,
      };

      this.productService.updateProduct(this.productId, updatedProduct);
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
    this.successMessage = 'Product updated successfully!';
    this.errorMessage = '';
  }

  showErrorMessage(): void {
    this.errorMessage = 'Please fill in all fields with valid values.';
    this.successMessage = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

