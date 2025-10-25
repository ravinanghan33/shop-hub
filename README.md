# 🛍️ ShopHub E-Commerce Store

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Deployed-brightgreen)](https://ravinanghan33.github.io/shop-hub/)
[![Build Status](https://img.shields.io/badge/Build-Passing-success)](https://github.com/ravinanghan33/shop-hub/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, production-ready e-commerce application built with React, TypeScript, Material-UI, and TanStack Query. This project demonstrates professional development practices, efficient caching strategies, and clean code architecture with comprehensive refactoring for maintainability and performance.

## ✨ Features

### 🛒 Customer Features
- **Product Catalog** - Browse products with advanced filtering, sorting, and search
- **Category Navigation** - Filter products by categories with dynamic loading
- **Product Details** - Detailed product pages with ratings, descriptions, and related products
- **Shopping Cart** - Add/remove items with quantity management and persistence
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices

### 👨‍💼 Admin Features
- **Dashboard** - Analytics with charts and statistics
- **Product Management** - Full CRUD operations with image upload
- **User Management** - View and manage user accounts
- **Cart/Order Management** - Monitor shopping carts and orders
- **Authentication** - Secure admin login system

### 🎨 User Experience
- **Dark/Light Theme** - Toggle between themes with localStorage persistence
- **Loading States** - Skeleton components and loading indicators
- **Error Handling** - User-friendly error messages and retry mechanisms
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe development with comprehensive type definitions
- **Vite** - Fast build tool with HMR and optimized production builds
- **TanStack Query v5** - Powerful data fetching, caching, and synchronization

### UI & Styling
- **Material-UI v6** - Modern component library with theming
- **Emotion** - CSS-in-JS styling with theme integration
- **Lucide React** - Beautiful, consistent icon library

### Development Tools
- **ESLint** - Code linting with React and TypeScript rules
- **TypeScript ESLint** - Advanced TypeScript linting
- **PostCSS** - CSS processing with Tailwind CSS
- **GitHub Pages** - Deployment and hosting

### API & State Management
- **Axios** - HTTP client with interceptors and error handling
- **React Router v7** - Declarative routing with nested routes
- **Context API** - State management for cart, theme, and authentication
- **Fake Store API** - RESTful backend API for demo purposes

## 📁 Project Structure

```
src/
├── api/                    # Modular API layer with interceptors
│   ├── client.ts          # Axios configuration with error handling
│   ├── products.ts        # Product CRUD operations
│   ├── categories.ts      # Category fetching
│   ├── users.ts           # User management endpoints
│   ├── carts.ts           # Cart operations
│   ├── auth.ts            # Authentication endpoints
│   └── index.ts           # API exports
├── components/            # Reusable UI components
│   ├── admin/            # Admin-specific components
│   │   ├── AdminTable.tsx       # Reusable data table
│   │   ├── AdminDialog.tsx      # Modal dialogs
│   │   ├── ProductFormDialog.tsx # Product CRUD forms
│   │   └── DeleteConfirmDialog.tsx
│   ├── CartItem.tsx       # Cart item component
│   ├── CartSummary.tsx    # Order summary component
│   ├── ProductGrid.tsx    # Product grid with loading states
│   ├── LoadingButton.tsx  # Button with loading state
│   ├── ErrorBoundary.tsx  # Error boundary component
│   └── ...                # Other UI components
├── context/               # React Context providers
│   ├── CartContext.tsx    # Shopping cart state
│   ├── ThemeContext.tsx   # Theme management
│   └── AdminAuthContext.tsx # Admin authentication
├── hooks/                 # Custom hooks with business logic
│   ├── useProducts.ts     # Product data fetching
│   ├── useUsers.ts        # User management
│   ├── useCarts.ts        # Cart operations
│   ├── useAuth.ts         # Authentication
│   ├── useLocalStorage.ts # localStorage management
│   ├── useDebounce.ts     # Debouncing utility
│   ├── useForm.ts         # Form state management
│   └── useQueryWrapper.ts # TanStack Query wrapper
├── pages/                 # Page components with routing
│   ├── HomePage.tsx       # Landing page
│   ├── ProductsPage.tsx   # Product catalog
│   ├── ProductDetailPage.tsx # Individual product view
│   ├── CartPage.tsx       # Shopping cart
│   ├── CategoryPage.tsx   # Category-specific products
│   └── admin/             # Admin panel pages
│       ├── AdminDashboard.tsx    # Analytics dashboard
│       ├── AdminProducts.tsx     # Product management
│       ├── AdminUsers.tsx        # User management
│       ├── AdminCarts.tsx        # Cart monitoring
│       ├── AdminLogin.tsx        # Admin authentication
│       └── AdminLayout.tsx       # Admin layout wrapper
├── theme/                 # Material-UI theme configuration
├── types/                 # TypeScript type definitions
│   ├── index.ts          # Main type exports
│   └── api.ts            # API-related types
├── utils/                 # Utility functions and helpers
│   ├── validation.ts     # Input validation utilities
│   ├── errorHandling.ts  # Error handling and logging
│   └── helpers.ts        # General helper functions
└── constants/            # Application constants
    └── admin.ts          # Admin panel constants
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm (or yarn/pnpm)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ravinanghan33/shop-hub.git
   cd shop-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run lint` | Run ESLint for code quality |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run predeploy` | Pre-deployment build (runs automatically) |

## 🔌 API Integration & Data Management

This project uses the [Fake Store API](https://fakestoreapi.com) with a robust, modular architecture designed for scalability and maintainability.

### API Architecture

The API layer is organized into focused modules with clear separation of concerns:

#### Core API Modules
- **`client.ts`** - Axios instance with request/response interceptors and error handling
- **`products.ts`** - Product CRUD operations with filtering and pagination
- **`categories.ts`** - Category fetching and management
- **`users.ts`** - User management and authentication
- **`carts.ts`** - Shopping cart operations
- **`auth.ts`** - Authentication endpoints

#### Key Features
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Type Safety**: Full TypeScript integration with API response types
- **Interceptors**: Request/response interceptors for logging and error processing
- **Modular Design**: Easy to extend and maintain

### Data Fetching with TanStack Query

All data fetching uses TanStack Query v5 through custom wrapper hooks for consistent behavior:

```typescript
// Product Management
const { products, loading, error, refetch } = useProducts(limit, sort);
const { product, loading, error } = useProductById(id);
const { products, loading, error } = useProductsByCategory(category);

// Category Management
const { categories, loading, error } = useCategories();

// User Management
const { users, loading, error } = useUsers(limit, sort);
const { user, loading, error } = useUserById(id);

// Cart Management
const { carts, loading, error } = useCarts();
const { cart, loading, error } = useCartById(id);
const { carts, loading, error } = useUserCarts(userId);

// Authentication
const { login, logout, isAuthenticated, token, error } = useAuth();
```

### Advanced Features

#### Custom Query Wrapper (`useQueryWrapper.ts`)
```typescript
interface UseQueryResult<T> {
  data: T | undefined;
  loading: boolean;
  isLoading: boolean;
  error: AppError | null;
  refetch: () => Promise<QueryObserverResult<T>>;
  isError: boolean;
  isSuccess: boolean;
}
```

**Benefits:**
- **Consistent Error Handling**: Standardized error processing across the app
- **Loading States**: Both `loading` and `isLoading` for different UI needs
- **Type Safety**: Full TypeScript generics support
- **Automatic Caching**: Intelligent caching with TanStack Query
- **Request Deduplication**: Prevents duplicate requests

#### Custom Hooks for Complex Logic
- **`useLocalStorage`**: Type-safe localStorage with React state synchronization
- **`useDebounce`**: Performance optimization for search and filtering
- **`useForm`**: Comprehensive form state management with validation

### Caching Strategy & Performance

TanStack Query is configured with production-ready defaults:

| Setting | Value | Purpose |
|---------|-------|---------|
| **Stale Time** | 5 minutes | Data considered fresh for this duration |
| **Cache Time** | 10 minutes | How long unused data stays in cache |
| **Retry** | 1 attempt | Number of retry attempts on failure |
| **Refetch on Focus** | Disabled | Prevents unnecessary refetches |

#### Bundle Optimization
- **Code Splitting**: Feature-based chunks reduce initial bundle size
- **Lazy Loading**: Components loaded on-demand
- **Tree Shaking**: Unused code automatically removed
- **Vendor Chunking**: Third-party libraries cached separately

**Bundle Analysis:**
- React Vendor: ~176KB (gzipped: ~58KB)
- UI Vendor (MUI): ~382KB (gzipped: ~115KB)
- Charts Vendor: ~346KB (gzipped: ~102KB)
- Admin Features: ~32KB (gzipped: ~8KB)
- Cart Features: ~5KB (gzipped: ~2KB)
- Products Features: ~10KB (gzipped: ~3KB)

## 👨‍💼 Admin Panel

Access the comprehensive admin panel at `/admin` with full-featured management capabilities.

### Admin Credentials
- **Email**: `admin@shophub.com`
- **Password**: `admin123`

### Admin Features

#### 📊 Dashboard
- **Analytics Overview**: Revenue, user, and product statistics
- **Interactive Charts**: Category distribution and price analysis using Recharts
- **Top Rated Products**: Performance metrics and trending items
- **Real-time Data**: Live updates with TanStack Query

#### 📦 Product Management
- **CRUD Operations**: Create, read, update, and delete products
- **Bulk Actions**: Efficient management of multiple products
- **Image Upload**: Support for product image URLs with preview
- **Category Assignment**: Dynamic category management
- **Search & Filter**: Advanced product filtering and search

#### 👥 User Management
- **User Overview**: Complete user account management
- **Profile Details**: User information and contact details
- **Activity Monitoring**: User behavior and cart history
- **Data Export**: User data management capabilities

#### 🛒 Cart/Order Management
- **Cart Monitoring**: View active shopping carts
- **Order History**: Complete order tracking and management
- **Revenue Analytics**: Sales performance and trends
- **Customer Insights**: Shopping behavior analysis

### Security Features
- **Protected Routes**: Secure admin-only access
- **Authentication**: JWT-based authentication system
- **Session Management**: Automatic logout and session handling
- **Input Validation**: Comprehensive form validation and sanitization

## ⚡ Performance Optimizations

### Code Splitting & Lazy Loading
- **Route-based Splitting**: Pages loaded on-demand
- **Component Lazy Loading**: Heavy components loaded asynchronously
- **Vendor Chunking**: Third-party libraries cached separately

### Caching & Data Management
- **TanStack Query**: Intelligent caching with 5-minute stale time
- **Request Deduplication**: Prevents duplicate API calls
- **Background Updates**: Data refreshed without user interaction
- **Optimistic Updates**: Immediate UI feedback for better UX

### Bundle Optimization
- **Tree Shaking**: Automatic removal of unused code
- **Dynamic Imports**: Feature-based code splitting
- **Asset Optimization**: Images and fonts optimized for web
- **Compression**: Gzip compression for smaller payloads

### React Performance
- **React.memo**: Prevents unnecessary re-renders
- **useMemo/useCallback**: Optimized expensive calculations
- **Virtual Scrolling**: Efficient rendering of large lists
- **Error Boundaries**: Graceful error handling and recovery

## 🧪 Testing & Quality Assurance

### Code Quality
- **ESLint**: Comprehensive linting with React and TypeScript rules
- **TypeScript**: Strict type checking with no `any` types
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality gates

### Development Tools
- **Vite Dev Server**: Fast HMR and development experience
- **Type Checking**: Real-time TypeScript error detection
- **Build Optimization**: Production-ready bundle analysis
- **GitHub Actions**: Automated testing and deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Workflow
1. **Fork the repository**
   ```bash
   git clone https://github.com/ravinanghan33/shop-hub.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Code Standards
- **TypeScript**: Strict typing, no `any` types
- **React**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Documentation**: JSDoc comments for public APIs

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Core Technologies
- **[Fake Store API](https://fakestoreapi.com)** - RESTful backend API for demo data
- **[Material-UI](https://mui.com)** - Comprehensive React component library
- **[TanStack Query](https://tanstack.com/query)** - Powerful data fetching and caching
- **[React Router](https://reactrouter.com)** - Declarative routing for React
- **[Vite](https://vitejs.dev)** - Fast build tool and development server

### Development Tools
- **[TypeScript](https://typescriptlang.org)** - JavaScript with syntax for types
- **[ESLint](https://eslint.org)** - Pluggable linting utility for JavaScript
- **[Axios](https://axios-http.com)** - Promise-based HTTP client
- **[Recharts](https://recharts.org)** - Composable charting library

### Special Thanks
- **Open Source Community** - For the amazing tools and libraries
- **Contributors** - For their valuable contributions and feedback

---

<div align="center">

**Built with ❤️ using React, TypeScript, and modern web technologies**

[⭐ Star this repo](https://github.com/ravinanghan33/shop-hub) • [🐛 Report Issues](https://github.com/ravinanghan33/shop-hub/issues) • [💡 Request Features](https://github.com/ravinanghan33/shop-hub/discussions)

</div>
