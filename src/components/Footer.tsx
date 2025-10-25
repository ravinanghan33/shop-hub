import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useProducts';
import ShopHub from "../asset/images/shop.svg";

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
               <img src={ShopHub} alt="" height={40} />
              <Typography variant="h6" fontWeight={700}>
                ShopHub
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your one-stop shop for quality products at great prices. Discover amazing deals every day.
            </Typography>
            <Box>
              <IconButton color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Categories
            </Typography>
            {categories.map((category) => (
              <Link
                key={category}
                component="button"
                variant="body2"
                onClick={() => navigate(`/category/${category}`)}
                sx={{
                  display: 'block',
                  mb: 1,
                  textAlign: 'left',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {category}
              </Link>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/')}
              sx={{
                display: 'block',
                mb: 1,
                textAlign: 'left',
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Home
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/products')}
              sx={{
                display: 'block',
                mb: 1,
                textAlign: 'left',
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              All Products
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/cart')}
              sx={{
                display: 'block',
                mb: 1,
                textAlign: 'left',
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Shopping Cart
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Customer Service
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Shipping Info
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Returns
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              FAQ
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/admin')}
              sx={{
                display: 'block',
                mt: 2,
                textAlign: 'left',
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { color: 'primary.dark' },
              }}
            >
              Admin Panel →
            </Link>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
