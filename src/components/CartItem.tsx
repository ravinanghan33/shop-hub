/**
 * CartItem component for displaying individual cart items with quantity controls
 * @param item - The cart item containing product and quantity
 * @param onUpdateQuantity - Callback to update item quantity
 * @param onRemove - Callback to remove item from cart
 */
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/helpers';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(product.id);
    } else {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            width: 80,
            height: 80,
            objectFit: 'contain',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {formatCurrency(product.price)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Remove />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
              inputProps={{ min: 1, style: { textAlign: 'center' } }}
              sx={{ width: 60 }}
            />
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Typography variant="h6" color="primary">
            {formatCurrency(itemTotal)}
          </Typography>
          <IconButton
            color="error"
            onClick={() => onRemove(product.id)}
            size="small"
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};