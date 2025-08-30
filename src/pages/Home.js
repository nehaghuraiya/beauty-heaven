import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

function Home() {
  const { products } = useProducts();
  
  // Get first 3 products as featured products
  const featuredProducts = products.slice(0, 3);
  
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
        >
          Welcome to Beauty Haven
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Discover our premium collection of beauty products that enhance your natural beauty.
          From skincare essentials to makeup must-haves, we have everything you need
          to look and feel your best.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/products"
          size="large"
          sx={{ mt: 2 }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Featured Products */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ₹{product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    component={RouterLink}
                    to={`/products/${product.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Beauty Haven
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          At Beauty Haven, we believe that everyone deserves to feel beautiful and confident.
          Our carefully curated selection of beauty products is designed to help you achieve
          your desired look while maintaining healthy skin. We source only the highest quality
          ingredients and work with trusted brands to bring you the best in beauty care.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home; 