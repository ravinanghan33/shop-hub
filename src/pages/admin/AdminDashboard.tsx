import React, { useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Paper,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Inventory,
  People,
  ShoppingCart,
  TrendingUp,
  AttachMoney,
  Category,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useProducts } from '../../hooks/useProducts';
import { useUsers } from '../../hooks/useUsers';
import { useCarts } from '../../hooks/useCarts';

export const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const { products, loading: productsLoading } = useProducts();
  const { users, loading: usersLoading } = useUsers();
  const { carts, loading: cartsLoading } = useCarts();

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const stats = useMemo(() => {
    const totalRevenue = carts.reduce((sum, cart) => {
      const cartTotal = cart.products.reduce((cartSum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return cartSum + (product?.price || 0) * item.quantity;
      }, 0);
      return sum + cartTotal;
    }, 0);

    const avgCartValue = carts.length > 0 ? totalRevenue / carts.length : 0;

    return [
      {
        title: 'Total Revenue',
        value: `$${totalRevenue.toFixed(2)}`,
        icon: <AttachMoney sx={{ fontSize: 40 }} />,
        color: '#10b981',
        loading: cartsLoading || productsLoading,
        change: '+12.5%',
      },
      {
        title: 'Total Products',
        value: products.length,
        icon: <Inventory sx={{ fontSize: 40 }} />,
        color: '#2563eb',
        loading: productsLoading,
        change: '+3',
      },
      {
        title: 'Total Users',
        value: users.length,
        icon: <People sx={{ fontSize: 40 }} />,
        color: '#8b5cf6',
        loading: usersLoading,
        change: '+8',
      },
      {
        title: 'Active Carts',
        value: carts.length,
        icon: <ShoppingCart sx={{ fontSize: 40 }} />,
        color: '#f59e0b',
        loading: cartsLoading,
        change: '+5',
      },
    ];
  }, [products, users, carts, productsLoading, usersLoading, cartsLoading]);

  const categoryData = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    products.forEach((product) => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    return Object.entries(categoryCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, [products]);

  const priceDistributionData = useMemo(() => {
    const ranges = [
      { name: '$0-$50', min: 0, max: 50, count: 0 },
      { name: '$50-$100', min: 50, max: 100, count: 0 },
      { name: '$100-$200', min: 100, max: 200, count: 0 },
      { name: '$200-$500', min: 200, max: 500, count: 0 },
      { name: '$500+', min: 500, max: Infinity, count: 0 },
    ];

    products.forEach((product) => {
      const range = ranges.find((r) => product.price >= r.min && product.price < r.max);
      if (range) range.count++;
    });

    return ranges;
  }, [products]);

  const topRatedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 5)
      .map((p) => ({
        name: p.title.length > 20 ? p.title.substring(0, 20) + '...' : p.title,
        rating: p.rating.rate,
        reviews: p.rating.count,
      }));
  }, [products]);

  const revenueByCategory = useMemo(() => {
    const categoryRevenue: Record<string, number> = {};
    carts.forEach((cart) => {
      cart.products.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (product) {
          const revenue = product.price * item.quantity;
          categoryRevenue[product.category] = (categoryRevenue[product.category] || 0) + revenue;
        }
      });
    });
    return Object.entries(categoryRevenue).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      revenue: Math.round(value * 100) / 100,
    }));
  }, [products, carts]);

  if (productsLoading && usersLoading && cartsLoading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time insights and analytics for your e-commerce store
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card
              sx={{
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${alpha(stat.color, 0.1)} 0%, ${alpha(stat.color, 0.05)} 100%)`
                  : `linear-gradient(135deg, ${alpha(stat.color, 0.05)} 0%, ${alpha(stat.color, 0.02)} 100%)`,
                border: `1px solid ${alpha(stat.color, 0.1)}`,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="text.secondary" variant="body2" gutterBottom fontWeight={500}>
                      {stat.title}
                    </Typography>
                    {stat.loading ? (
                      <Box sx={{ width: 100, mt: 2 }}>
                        <LinearProgress sx={{ borderRadius: 2 }} />
                      </Box>
                    ) : (
                      <>
                        <Typography variant="h3" fontWeight={700} sx={{ my: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                          {stat.change}
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(stat.color, 0.1),
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TrendingUp color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Revenue by Category
                </Typography>
              </Box>
              {revenueByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByCategory}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                        borderRadius: 8,
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                  No revenue data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Category color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Product Categories
                </Typography>
              </Box>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                        borderRadius: 8,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                  No category data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Price Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Products grouped by price range
              </Typography>
              {priceDistributionData.some((d) => d.count > 0) ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priceDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                        borderRadius: 8,
                      }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                  No price data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Top Rated Products
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Best performing products by customer ratings
              </Typography>
              {topRatedProducts.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={topRatedProducts}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis domain={[0, 5]} stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                        borderRadius: 8,
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={2} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                  No rating data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Store Summary
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Products
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {products.length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Active Categories
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {categoryData.length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Registered Users
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {users.length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Shopping Carts
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {carts.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quick Insights
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: alpha('#10b981', 0.1),
                    border: `1px solid ${alpha('#10b981', 0.2)}`,
                  }}
                >
                  <Typography variant="body2" fontWeight={600} color="#10b981">
                    Average Product Rating
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                    {products.length > 0
                      ? (products.reduce((sum, p) => sum + p.rating.rate, 0) / products.length).toFixed(1)
                      : '0'}
                    ⭐
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: alpha('#2563eb', 0.1),
                    border: `1px solid ${alpha('#2563eb', 0.2)}`,
                  }}
                >
                  <Typography variant="body2" fontWeight={600} color="#2563eb">
                    Total Reviews
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                    {products.reduce((sum, p) => sum + p.rating.count, 0)}
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
