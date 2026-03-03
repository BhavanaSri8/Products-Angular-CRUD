import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product', (done) => {
    const newProduct = { name: 'Test Product', price: 99.99, description: 'Test', quantity: 1 };
    service.addProduct(newProduct);
    
    service.getProducts().subscribe(products => {
      expect(products.length).toBeGreaterThan(3);
      done();
    });
  });

  it('should delete a product', (done) => {
    const productId = 1;
    service.deleteProduct(productId);
    
    service.getProducts().subscribe(products => {
      expect(products.find(p => p.id === productId)).toBeUndefined();
      done();
    });
  });
});
