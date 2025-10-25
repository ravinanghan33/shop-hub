import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  TablePagination,
  Tooltip,
} from '@mui/material';
import {
  Visibility,
  Delete,
  Refresh,
  ShoppingCart,
} from '@mui/icons-material';
import { useCarts } from '../../hooks/useCarts';
import { useProducts } from '../../hooks/useProducts';
import { cartsApi } from '../../api';
import { ApiCart } from '../../types';

export const AdminCarts: React.FC = () => {
  const { carts, loading, refetch } = useCarts();
  const { products } = useProducts();
  const [viewingCart, setViewingCart] = useState<ApiCart | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleViewCart = (cart: ApiCart) => {
    setViewingCart(cart);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setViewingCart(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this cart?')) return;

    try {
      await cartsApi.delete(id);
      refetch();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product?.title || `Product #${productId}`;
  };

  const getProductPrice = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product?.price || 0;
  };

  const calculateCartTotal = (cart: ApiCart) => {
    return cart.products.reduce((total, item) => {
      const price = getProductPrice(item.productId);
      return total + price * item.quantity;
    }, 0);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Carts & Orders Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {carts.length} active carts
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<Refresh />} onClick={refetch}>
          Refresh
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cart ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cart) => (
              <TableRow key={cart.id} hover>
                <TableCell>
                  <Chip
                    icon={<ShoppingCart />}
                    label={`#${cart.id}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">User #{cart.userId}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(cart.date).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${cart.products.length} items`}
                    size="small"
                    color="secondary"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    ${calculateCartTotal(cart).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Cart Details">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewCart(cart)}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Cart">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(cart.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={carts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Cart Details - #{viewingCart?.id}
        </DialogTitle>
        <DialogContent>
          {viewingCart && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  User ID: {viewingCart.userId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(viewingCart.date).toLocaleString()}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Cart Items ({viewingCart.products.length})
              </Typography>

              <List>
                {viewingCart.products.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={getProductName(item.productId)}
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Product ID: {item.productId}
                          </Typography>
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            Quantity: {item.quantity} × ${getProductPrice(item.productId).toFixed(2)} = $
                            {(getProductPrice(item.productId) * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight={600}>
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight={600} color="primary">
                  ${calculateCartTotal(viewingCart).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
