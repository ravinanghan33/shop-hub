import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(module => ({ default: module.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(module => ({ default: module.CategoryPage })));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(module => ({ default: module.AdminLayout })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts').then(module => ({ default: module.AdminProducts })));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers').then(module => ({ default: module.AdminUsers })));
const AdminCarts = lazy(() => import('./pages/admin/AdminCarts').then(module => ({ default: module.AdminCarts })));

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <BrowserRouter basename="/shop-hub">
      <ThemeProvider>
        <AdminAuthProvider>
          <CartProvider>
            <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="products"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductsPage />
                  </Suspense>
                }
              />
              <Route
                path="product/:id"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductDetailPage />
                  </Suspense>
                }
              />
              <Route
                path="category/:category"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CategoryPage />
                  </Suspense>
                }
              />
              <Route
                path="cart"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CartPage />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            <Route path="/admin" element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }>
              <Route
                index
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="products"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminProducts />
                  </Suspense>
                }
              />
              <Route
                path="users"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminUsers />
                  </Suspense>
                }
              />
              <Route
                path="carts"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminCarts />
                  </Suspense>
                }
              />
            </Route>
            </Routes>
          </CartProvider>
        </AdminAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
