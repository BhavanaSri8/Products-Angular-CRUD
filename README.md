# Products Management Application

A modern Angular 18 application for managing products with complete CRUD operations, built with standalone components, TypeScript, Tailwind CSS, and RxJS observables.

## 🎯 Features

- ✨ **Product List**: View all products in a responsive, feature-rich table
- ➕ **Add Product**: Create new products with name, price, description, and quantity
- ✏️ **Edit Product**: Update existing product information
- 🗑️ **Delete Product**: Remove products from inventory
- 🎨 **Beautiful UI**: Modern gradient design with Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Real-time Updates**: Observable-based state management with RxJS
- ✅ **Form Validation**: Validates all required fields before submission
- 💬 **User Feedback**: Success and error messages for all operations

## 🛠️ Tech Stack

- **Angular 18**: Latest version with standalone components
- **TypeScript**: Strongly typed code for better reliability
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **RxJS**: Reactive programming with Observables and Subjects
- **Angular Router**: Client-side routing for seamless navigation
- **PostCSS**: CSS transformation for Tailwind compilation

## 📁 Project Structure

```
src/
├── app/
│   ├── app.config.ts              # Application configuration
│   ├── app.routes.ts              # Route definitions
│   ├── app.ts                     # Root component with router outlet
│   ├── app.html                   # Root template
│   ├── app.css                    # Global component styles
│   └── features/
│       └── products/
│           ├── components/
│           │   ├── product-list/
│           │   │   ├── product-list.ts
│           │   │   ├── product-list.html
│           │   │   ├── product-list.css
│           │   │   └── product-list.spec.ts
│           │   ├── add-product/
│           │   │   ├── add-product.ts
│           │   │   ├── add-product.html
│           │   │   ├── add-product.css
│           │   │   └── add-product.spec.ts
│           │   └── edit-product/
│           │       ├── edit-product.ts
│           │       ├── edit-product.html
│           │       ├── edit-product.css
│           │       └── edit-product.spec.ts
│           └── services/
│               ├── product.service.ts
│               └── product.service.spec.ts
├── models/
│   └── product.model.ts           # Product interface definition
├── styles.css                     # Global Tailwind imports
├── main.ts                        # Application bootstrap
└── index.html                     # HTML template
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Angular CLI**: v18.0.0

Install Angular CLI globally (if not already installed):
```powershell
npm install -g @angular/cli@18
```

### Installation

1. **Clone or navigate to the project**:
   ```powershell
   cd "d:\Hartford Java Assignments\Angular\services\productsDemo"
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Install Tailwind CSS** (if needed):
   ```powershell
   npm install -D tailwindcss postcss autoprefixer
   ```

### Development Server

Start the development server:
```powershell
ng serve --open
```

The application will automatically open in your browser at `http://localhost:4200/`.

To run on a different port:
```powershell
ng serve --port 4300 --open
```

## 📖 Component Documentation

### ProductListComponent
**Purpose**: Displays all products in a responsive table

**Features**:
- Table view with product details (ID, Name, Price, Description, Quantity)
- Edit and Delete action buttons for each product
- Navigation link to Add Product page
- Empty state message when no products exist
- Hover effects and smooth transitions

**Key Methods**:
- `navigateToAdd()`: Navigate to add product page
- `navigateToEdit(id)`: Navigate to edit product page
- `deleteProduct(id)`: Delete a product with confirmation

### AddProductComponent
**Purpose**: Form for creating new products

**Features**:
- Form fields: Product Name, Price, Description, Quantity
- Form validation for all required fields
- Success message after adding product
- Error message display
- Cancel button to return to product list
- Auto-navigation to product list on successful submission

**Key Methods**:
- `addProduct()`: Submit form and create new product
- `isFormValid()`: Validate all required fields
- `cancel()`: Navigate back to product list
- `showSuccessMessage()`: Display success feedback

### EditProductComponent
**Purpose**: Form for updating existing product information

**Features**:
- Auto-loads product data from route parameter (ID)
- Loading state while fetching product data
- Form fields pre-populated with current product data
- Form validation before submission
- Success/error message display
- Proper subscription cleanup using RxJS takeUntil pattern

**Key Methods**:
- `updateProduct()`: Submit form and update product
- `cancel()`: Navigate back to product list
- `ngOnDestroy()`: Cleanup subscriptions

## 🔧 Service Details

### ProductService
Manages all product-related operations and state management

**Properties**:
- `products$`: BehaviorSubject containing array of products

**Methods**:
- `getProducts()`: Returns Observable<Product[]> of all products
- `getProductById(id)`: Returns Observable<Product | undefined> for a specific product
- `addProduct(product)`: Adds a new product and emits updated list
- `updateProduct(id, product)`: Updates an existing product
- `deleteProduct(id)`: Removes a product from the list

**Initial Data**:
- Laptop - $999.99 (Quantity: 5)
- Mouse - $29.99 (Quantity: 15)
- Keyboard - $79.99 (Quantity: 8)

## 🌐 Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | ProductListComponent | Display all products |
| `/add` | AddProductComponent | Create new product |
| `/edit/:id` | EditProductComponent | Edit existing product |

## 📦 Data Model

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
}
```

## 🎨 Styling

The application features a modern design with Tailwind CSS:

**Color Scheme**:
- **Primary**: Pink and Purple gradients
- **Secondary**: Rose and Magenta accents
- **Buttons**: 
  - Add/Submit: Pink-to-Rose gradient
  - Edit: Blue gradient
  - Delete: Red gradient
  - Cancel: Gray gradient

**Responsive Design**:
- Mobile-first approach
- Tailwind breakpoints for tablets and desktops
- Flexbox and CSS Grid for layouts
- Shadow and transition effects for depth

## 🧪 Testing

Run unit tests:
```powershell
ng test
```

## 🏗️ Building for Production

Create an optimized production build:
```powershell
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## 💡 Key Implementation Details

### Observable Subscription Management
Components properly manage RxJS subscriptions using the `takeUntil` pattern with a `destroy$` Subject:
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.getProduct().pipe(
    takeUntil(this.destroy$)
  ).subscribe(...);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Route Parameter Handling
The Edit component converts string route parameters to numbers for proper type safety:
```typescript
this.productId = +params['id']; // Unary + operator converts string to number
```

### Form Validation
Forms validate required fields before submission and display user-friendly error messages.

### Reactive State Management
Uses BehaviorSubject for centralized state management ensuring all components stay in sync.

## 🔍 Troubleshooting

### Port Already in Use
```powershell
ng serve --port 4300
```

### Clear Cache and Reinstall Dependencies
```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
```

### Build Errors
Ensure TypeScript and Angular are properly configured:
```powershell
npm install
ng build --configuration development
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)

## 📚 Learning Resources

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RxJS Documentation](https://rxjs.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📝 Running the Application

```bash
npm install
npm start
```

Navigate to `http://localhost:4200/`
