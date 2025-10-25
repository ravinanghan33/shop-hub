import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Product } from '../types';
import { formatCurrency } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: 'contain',
            p: 4,
            backgroundColor: 'background.paper',
          }}
        />
        <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'background.paper',
              '&:hover': { backgroundColor: 'background.paper' },
            }}
            onClick={handleFavoriteToggle}
            size="small"
          >
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            textTransform: 'capitalize',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3em',
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={product.rating.rate} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.rating.count})
          </Typography>
        </Box>

        <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mt: 'auto' }}>
          {formatCurrency(product.price)}
        </Typography>

        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          fullWidth
          onClick={handleAddToCart}
          disabled={isInCart(product.id)}
          sx={{ mt: 1 }}
        >
          {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
