import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { formatCurrency } from '../utils/helpers';

interface CartSummaryProps {
  subtotal: number;
  shippingThreshold?: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shippingThreshold = 50,
  onCheckout,
  isLoading = false,
}) => {
  const shipping = subtotal >= shippingThreshold ? 0 : 9.99;
  const total = subtotal + shipping;
  const remainingForFreeShipping = shippingThreshold - subtotal;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Subtotal</Typography>
        <Typography>{formatCurrency(subtotal)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Shipping</Typography>
        <Typography>
          {shipping === 0 ? 'Free' : formatCurrency(shipping)}
        </Typography>
      </Box>

      {remainingForFreeShipping > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Add {formatCurrency(remainingForFreeShipping)} more for free shipping!
        </Alert>
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" color="primary">
          {formatCurrency(total)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        startIcon={<ShoppingCartCheckout />}
      >
        {isLoading ? 'Processing...' : 'Checkout'}
      </Button>
    </Box>
  );
};