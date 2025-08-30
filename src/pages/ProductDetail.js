import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getProductById } = useProducts();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const product = getProductById(id);

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
    });
    navigate('/cart');
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setSnackbar({
        open: true,
        message: `${product.name} removed from wishlist!`,
      });
    } else {
      addToWishlist(product);
      setSnackbar({
        open: true,
        message: `${product.name} added to wishlist!`,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1">
                {product.name}
              </Typography>
              <IconButton 
                onClick={handleWishlist}
                color={isInWishlist(product.id) ? 'error' : 'default'}
                size="large"
              >
                {isInWishlist(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                ₹{product.price.toFixed(2)}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="success.main" fontWeight="bold">
                20% OFF
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
                sx={{ mb: 2 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleBuyNow}
                fullWidth
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductDetail; 