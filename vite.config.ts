import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shop-hub",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'query-vendor': ['@tanstack/react-query'],
          'chart-vendor': ['recharts'],
          'utils-vendor': ['axios', 'lucide-react'],

          // Feature chunks
          'admin': [
            './src/pages/admin/AdminDashboard.tsx',
            './src/pages/admin/AdminProducts.tsx',
            './src/pages/admin/AdminUsers.tsx',
            './src/pages/admin/AdminCarts.tsx',
            './src/components/admin/AdminTable.tsx',
            './src/components/admin/AdminDialog.tsx',
            './src/components/admin/DeleteConfirmDialog.tsx',
            './src/components/admin/ProductFormDialog.tsx'
          ],
          'cart': [
            './src/pages/CartPage.tsx',
            './src/components/CartItem.tsx',
            './src/components/CartSummary.tsx',
            './src/context/CartContext.tsx'
          ],
          'products': [
            './src/pages/ProductsPage.tsx',
            './src/pages/ProductDetailPage.tsx',
            './src/components/ProductCard.tsx',
            './src/components/ProductGrid.tsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
