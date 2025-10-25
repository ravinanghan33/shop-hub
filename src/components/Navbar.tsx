import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
  InputBase,
  alpha,
} from "@mui/material";
import {
  ShoppingCart,
  Menu as MenuIcon,
  Search as SearchIcon,
  Brightness4,
  Brightness7,
  AdminPanelSettings,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useCategories } from "../hooks/useProducts";
import ShopHub from "../asset/images/shop.svg";

interface NavbarProps {
  onCartOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartOpen }) => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const { mode, toggleTheme } = useTheme();
  const { categories } = useCategories();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    ...categories.map((cat) => ({
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      path: `/category/${cat}`,
    })),
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
         <img src={ShopHub} alt="" height={40} />
         ShopHub
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                mr: 4,
              }}
              onClick={() => navigate("/")}
            >
           
              <img src={ShopHub} alt="" height={40} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  display: { xs: "none", sm: "block" },
                }}
              >
                ShopHub
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1, mr: 3 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                position: "relative",
                borderRadius: 1,
                backgroundColor: alpha(muiTheme.palette.common.white, 0.15),
                "&:hover": {
                  backgroundColor: alpha(muiTheme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: "100%",
                maxWidth: { xs: "100%", sm: 400 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "0 8px",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  color: "inherit",
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "8px 8px 8px 0",
                  },
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Tooltip
              title={
                mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Admin Panel">
              <IconButton color="inherit" onClick={() => navigate("/admin")}>
                <AdminPanelSettings />
              </IconButton>
            </Tooltip>

            <Tooltip title="Shopping Cart">
              <IconButton color="inherit" onClick={onCartOpen}>
                <Badge badgeContent={getItemCount()} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
