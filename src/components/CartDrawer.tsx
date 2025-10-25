import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import { Close, Delete, Add, Remove } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from './EmptyState';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: 400 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={600}>
            Shopping Cart ({items.length})
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        {items.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EmptyState
              title="Your cart is empty"
              description="Add some products to get started!"
              actionLabel="Browse Products"
              onAction={() => {
                navigate('/products');
                onClose();
              }}
            />
          </Box>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {items.map((item) => (
                <ListItem
                  key={item.product.id}
                  sx={{
                    mb: 2,
                    p: 0,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        borderRadius: 1,
                        border: 1,
                        borderColor: 'divider',
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={item.product.image}
                        alt={item.product.title}
                        sx={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          mb: 1,
                        }}
                      >
                        {item.product.title}
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight={700}>
                        {formatCurrency(item.product.price)}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item.product.id)}
                      color="error"
                      sx={{
                        borderRadius: '50%',
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            updateQuantity(item.product.id, val);
                          }
                        }}
                        size="small"
                        sx={{ width: 60 }}
                        inputProps={{ style: { textAlign: 'center' } }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="body1" fontWeight={600}>
                      {formatCurrency(item.product.price * item.quantity)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Divider />

            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  {formatCurrency(getCartTotal())}
                </Typography>
              </Box>
              <Button variant="contained" fullWidth size="large" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
