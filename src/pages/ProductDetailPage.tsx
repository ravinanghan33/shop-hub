import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  Breadcrumbs,
  Link,
  TextField,
  IconButton,
  Divider,
  Card,
  CardContent,
  Alert,
  Skeleton,
} from '@mui/material';
import { Add, Remove, ShoppingCart, ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductById, useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProductById(Number(id));
  const { products } = useProducts();
  const { addToCart, isInCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={40} width="60%" />
            <Skeleton variant="text" height={100} />
            <Skeleton variant="rectangular" height={50} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Product not found'}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/')}
          sx={{ textDecoration: 'none' }}
        >
          Home
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/products')}
          sx={{ textDecoration: 'none' }}
        >
          Products
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate(`/category/${product.category}`)}
          sx={{ textDecoration: 'none', textTransform: 'capitalize' }}
        >
          {product.category}
        </Link>
        <Typography variant="body2" color="text.primary">
          {product.title}
        </Typography>
      </Breadcrumbs>

      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
                minHeight: 500,
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  maxWidth: '100%',
                  maxHeight: 450,
                  objectFit: 'contain',
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Chip
              label={product.category}
              sx={{ mb: 2, textTransform: 'capitalize' }}
            />

            <Typography variant="h4" fontWeight={700} gutterBottom>
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Rating value={product.rating.rate} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.rating.count} reviews)
              </Typography>
            </Box>

            <Typography variant="h3" color="primary" fontWeight={700} sx={{ mb: 3 }}>
              {formatCurrency(product.price)}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight={600} gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) handleQuantityChange(val);
                    }}
                    size="small"
                    sx={{ width: 80 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(quantity + 1)}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={isInCart(product.id)}
                sx={{ flex: 1, minWidth: 200 }}
              >
                {isInCart(product.id) ? 'Already in Cart' : 'Add to Cart'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/cart')}
              >
                View Cart
              </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    <strong>Free shipping</strong> on orders over $50
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Easy returns</strong> within 30 days
                  </Typography>
                  <Typography variant="body2">
                    <strong>Secure checkout</strong> guaranteed
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Related Products
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};
