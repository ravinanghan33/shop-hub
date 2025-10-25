import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  alpha,
} from '@mui/material';
import { ArrowForward, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProducts, useCategories } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  const featuredProducts = products.slice(0, 4);
  const topRatedProducts = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);

  const getCategoryImage = (category: string) => {
    const categoryProduct = products.find((p) => p.category === category);
    return categoryProduct?.image || '';
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'light'
              ? alpha(theme.palette.primary.main, 0.05)
              : alpha(theme.palette.primary.main, 0.1),
          py: { xs: 8, md: 12 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Discover Amazing Products
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Shop the latest trends and find great deals on quality products. Your perfect purchase is just a click away.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/products')}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/products')}
                >
                  Browse Categories
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Shopping"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {categoriesLoading
            ? Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ProductCardSkeleton />
                </Grid>
              ))
            : categories.map((category) => (
                <Grid item xs={12} sm={6} md={3} key={category}>
                  <Card>
                    <CardActionArea onClick={() => navigate(`/category/${category}`)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={getCategoryImage(category)}
                        alt={category}
                        sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                        >
                          {category}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Featured Products
          </Typography>
          <Button
            endIcon={<ArrowForward />}
            onClick={() => navigate('/products')}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {loading
            ? Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ProductCardSkeleton />
                </Grid>
              ))
            : featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp color="primary" />
            <Typography variant="h4" fontWeight={700}>
              Top Rated Products
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForward />}
            onClick={() => navigate('/products')}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {loading
            ? Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ProductCardSkeleton />
                </Grid>
              ))
            : topRatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
};
