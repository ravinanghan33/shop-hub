import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Refresh,
} from '@mui/icons-material';
import { useProducts, useCategories } from '../../hooks/useProducts';
import { productsApi } from '../../api';
import { Product, CreateProductDto } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { TruncatedText } from '../../components/TruncatedText';
import { ProductFormDialog } from '../../components/admin/ProductFormDialog';
import { DeleteConfirmDialog } from '../../components/admin/DeleteConfirmDialog';
import { AdminTable } from '../../components/admin/AdminTable';
import { ADMIN_CONSTANTS } from '../../constants/admin';

export const AdminProducts: React.FC = () => {
  const { products, loading, refetch } = useProducts();
  const [page, setPage] = useState(ADMIN_CONSTANTS.PAGINATION.DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(ADMIN_CONSTANTS.PAGINATION.DEFAULT_ROWS_PER_PAGE);
  const { categories } = useCategories();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; product: Product | null }>({
    open: false,
    product: null,
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (formData: CreateProductDto) => {
    try {
      if (editingProduct) {
        await productsApi.update(editingProduct.id, formData);
        setSnackbar({ open: true, message: 'Product updated successfully!', severity: 'success' });
      } else {
        await productsApi.create(formData);
        setSnackbar({ open: true, message: 'Product created successfully!', severity: 'success' });
      }
      refetch();
    } catch (error) {
      console.error('Product operation error:', error);
      setSnackbar({ open: true, message: 'Operation failed. Please try again.', severity: 'error' });
      throw error;
    }
  };

  const handleOpenDeleteDialog = (product: Product) => {
    setDeleteDialog({ open: true, product });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, product: null });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.product) return;

    try {
      await productsApi.delete(deleteDialog.product.id);
      setSnackbar({ open: true, message: 'Product deleted successfully!', severity: 'success' });
      refetch();
    } catch (error) {
      console.error('Product delete error:', error);
      setSnackbar({ open: true, message: 'Delete failed. Please try again.', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Products Management
        </Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {Array.from(new Array(6)).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Box>
      </Box>
    );
  }

  const columns = [
    {
      id: 'image' as const,
      label: 'Image',
      format: (value: string, product: Product) => (
        <Box
          component="img"
          src={value}
          alt={product.title}
          sx={{
            width: ADMIN_CONSTANTS.PRODUCTS.IMAGE_SIZE,
            height: ADMIN_CONSTANTS.PRODUCTS.IMAGE_SIZE,
            objectFit: 'contain',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            p: 0.5,
          }}
        />
      ),
    },
    {
      id: 'title' as const,
      label: 'Product',
      format: (value: string, product: Product) => (
        <Box sx={{ maxWidth: ADMIN_CONSTANTS.PRODUCTS.TITLE_MAX_WIDTH }}>
          <TruncatedText
            text={value}
            maxLines={1}
            tooltipThreshold={ADMIN_CONSTANTS.PRODUCTS.TITLE_TOOLTIP_THRESHOLD}
            variant="body2"
            fontWeight={600}
          />
          <TruncatedText
            text={product.description}
            maxLines={ADMIN_CONSTANTS.PRODUCTS.DESCRIPTION_MAX_LINES}
            tooltipThreshold={ADMIN_CONSTANTS.PRODUCTS.DESCRIPTION_TOOLTIP_THRESHOLD}
            variant="caption"
            color="text.secondary"
          />
        </Box>
      ),
    },
    {
      id: 'category' as const,
      label: 'Category',
      format: (value: string) => (
        <Chip
          label={value}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      id: 'price' as const,
      label: 'Price',
      format: (value: number) => (
        <Typography variant="body2" fontWeight={600}>
          {formatCurrency(value)}
        </Typography>
      ),
    },
    {
      id: 'rating' as const,
      label: 'Rating',
      format: (value: any, product: Product) => (
        <Typography variant="body2">
          ⭐ {product.rating.rate} ({product.rating.count})
        </Typography>
      ),
    },
    {
      id: 'actions' as const,
      label: 'Actions',
      align: 'right' as const,
      format: (value: any, product: Product) => (
        <>
          <Tooltip title="Edit Product">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenEdit(product)}
              aria-label={`Edit ${product.title}`}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Product">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleOpenDeleteDialog(product)}
              aria-label={`Delete ${product.title}`}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const paginatedProducts = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Products Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {products.length} products in total
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={refetch}
            aria-label="Refresh products list"
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAdd}
            aria-label="Add new product"
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <AdminTable
        columns={columns}
        data={paginatedProducts}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={products.length}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        title="Products"
        emptyMessage="No products found"
      />

      <ProductFormDialog
        open={openDialog}
        onClose={handleClose}
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        categories={categories}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.product?.title}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={ADMIN_CONSTANTS.SNACKBAR.AUTO_HIDE_DURATION}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
