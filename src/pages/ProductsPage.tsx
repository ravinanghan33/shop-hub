import React, { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Paper,
  Slider,
  FormControlLabel,
  Checkbox,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import { FilterList, Close } from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { EmptyState } from '../components/EmptyState';
import { ProductGrid } from '../components/ProductGrid';
import { SortOption } from '../types';
import { useSearchParams } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const { products, loading } = useProducts();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [filterOpen, setFilterOpen] = useState(false);

  const searchQuery = searchParams.get('search') || '';

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 1000);
  }, [products]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    filtered = filtered.filter((p) => p.rating.rate >= minRating);

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [products, selectedCategories, priceRange, minRating, sortBy, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setSortBy('default');
  };

  const FilterPanel = (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={() => setFilterOpen(false)}>
            <Close />
          </IconButton>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Categories
        </Typography>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={
              <Typography sx={{ textTransform: 'capitalize' }}>
                {category}
              </Typography>
            }
          />
        ))}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Minimum Rating
        </Typography>
        <Slider
          value={minRating}
          onChange={(_, newValue) => setMinRating(newValue as number)}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.5}
          marks
          sx={{ mt: 2 }}
        />
      </Box>

      <Button variant="outlined" fullWidth onClick={handleClearFilters}>
        Clear All Filters
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {filteredAndSortedProducts.length} products found
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {isMobile ? (
            <>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                fullWidth
                onClick={() => setFilterOpen(true)}
                sx={{ mb: 2 }}
              >
                Filters
              </Button>
              <Drawer
                anchor="left"
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
              >
                <Box sx={{ width: 280 }}>{FilterPanel}</Box>
              </Drawer>
            </>
          ) : (
            <Paper sx={{ position: 'sticky', top: 80 }}>{FilterPanel}</Paper>
          )}
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {selectedCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onDelete={() => handleCategoryChange(category)}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </Box>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={sortBy}
                onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as SortOption)}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
                <MenuItem value="name">Name: A to Z</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {filteredAndSortedProducts.length === 0 && !loading ? (
            <EmptyState
              title="No products found"
              description="Try adjusting your filters or search query"
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
            />
          ) : (
            <ProductGrid
              products={filteredAndSortedProducts}
              loading={loading}
              skeletonCount={8}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
