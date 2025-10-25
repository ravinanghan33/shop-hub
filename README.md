# ShopHub E-Commerce Store

A modern, production-ready e-commerce application built with React, TypeScript, Material-UI, and TanStack Query. This project demonstrates professional API integration patterns, efficient caching strategies, and clean code architecture.

## Features

- **Product Catalog** - Browse products with filtering, sorting, and search
- **Category Navigation** - Filter products by categories
- **Product Details** - Detailed product pages with ratings and descriptions
- **Shopping Cart** - Add items to cart with quantity management
- **Admin Dashboard** - Manage products, users, and carts
- **Dark/Light Theme** - Toggle between themes with persistence
- **Responsive Design** - Optimized for mobile and desktop

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query v5** - Data fetching and caching
- **Material-UI v6** - Component library
- **Axios** - HTTP client
- **React Router v7** - Navigation
- **Fake Store API** - Backend API

## Project Structure

```
src/
├── api/                # Modular API layer
│   ├── client.ts       # Axios configuration
│   ├── products.ts     # Product endpoints
│   ├── categories.ts   # Category endpoints
│   ├── users.ts        # User endpoints
│   ├── carts.ts        # Cart endpoints
│   └── auth.ts         # Auth endpoints
├── components/         # Reusable UI components
├── context/           # React context (Cart, Theme, AdminAuth)
├── hooks/             # Custom hooks with TanStack Query
│   ├── useProducts.ts
│   ├── useUsers.ts
│   ├── useCarts.ts
│   ├── useAuth.ts
│   └── useQueryWrapper.ts
├── pages/             # Page components
│   └── admin/        # Admin panel pages
├── theme/            # MUI theme configuration
├── types/            # TypeScript definitions
└── utils/            # Helper functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## API Integration

This project uses the [Fake Store API](https://fakestoreapi.com) with a modular architecture:

### API Modules

- `client.ts` - Axios instance with interceptors
- `products.ts` - Product CRUD operations
- `categories.ts` - Category fetching
- `users.ts` - User management
- `carts.ts` - Cart operations
- `auth.ts` - Authentication

### Custom Hooks with TanStack Query

All data fetching uses TanStack Query through custom wrapper hooks:

```typescript
// Fetch all products
const { products, loading, isLoading, error, refetch } = useProducts();

// Fetch single product
const { product, loading, error } = useProductById(id);

// Fetch products by category
const { products, loading, error } = useProductsByCategory(category);

// Fetch categories
const { categories, loading, error } = useCategories();

// Fetch users
const { users, loading, error } = useUsers();

// Fetch carts
const { carts, loading, error } = useCarts();

// Authentication
const { login, logout, isAuthenticated, token } = useAuth();
```

### Query Wrapper

The custom `useQuery` wrapper (`src/hooks/useQueryWrapper.ts`) provides:
- Consistent error handling
- Loading states (both `loading` and `isLoading`)
- Type safety with TypeScript generics
- Automatic caching via TanStack Query
- Request deduplication

## Caching Strategy

TanStack Query is configured with optimal defaults:
- **Stale Time**: 5 minutes
- **Cache Time**: 10 minutes
- **Retry**: 1 attempt
- **Refetch on Window Focus**: Disabled

This ensures optimal performance while keeping data reasonably fresh.

## Admin Panel

Access the admin panel at `/admin`:
- Login: `admin@shophub.com`
- Password: `admin123`

Features:
- Dashboard with statistics
- Product management (CRUD)
- User management
- Cart/Order viewing
- Protected routes
- Theme support

## Performance Optimizations

- Code splitting with lazy loading
- TanStack Query caching and deduplication
- React.memo for ProductCard components
- Optimized bundle size
- Tree shaking for unused code

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Fake Store API](https://fakestoreapi.com) - Backend API
- [Material-UI](https://mui.com) - Component library
- [TanStack Query](https://tanstack.com/query) - Data fetching
