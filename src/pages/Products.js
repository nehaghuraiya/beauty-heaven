import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CardActions,
  IconButton,
  Chip,
  Rating,
  Skeleton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/productData';
import ProductSkeleton from '../components/ProductSkeleton';
import QuickViewModal from '../components/QuickViewModal';
import toast from 'react-hot-toast';

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    navigate('/cart');
  };

  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Our Products
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover our premium collection of beauty products
        </Typography>
      </motion.div>
      
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
            size="large"
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Skincare">Skincare</MenuItem>
              <MenuItem value="Makeup">Makeup</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          <AnimatePresence>
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <ProductSkeleton />
                </Grid>
              ))
            ) : (
              // Actual products
              filteredProducts.map((product, index) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <motion.div
                    variants={itemVariants}
                    layout
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: (theme) => theme.shadows[8],
                        },
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="300"
                          image={product.image}
                          alt={product.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 1,
                          }}
                        >
                          <IconButton
                            onClick={() => handleQuickView(product)}
                            sx={{
                              bgcolor: 'background.paper',
                              '&:hover': { bgcolor: 'background.paper' },
                            }}
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleWishlist(product)}
                            color={isInWishlist(product.id) ? 'error' : 'default'}
                            sx={{
                              bgcolor: 'background.paper',
                              '&:hover': { bgcolor: 'background.paper' },
                            }}
                            size="small"
                          >
                            {isInWishlist(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </IconButton>
                        </Box>
                      </Box>

                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography gutterBottom variant="h6" component="h3" fontWeight="600">
                            {product.name}
                          </Typography>
                        </Box>
                        
                        <Chip 
                          label={product.category} 
                          color="primary" 
                          variant="outlined" 
                          size="small" 
                          sx={{ mb: 1 }}
                        />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={4.5} precision={0.5} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            (4.5)
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h5" color="primary" fontWeight="bold">
                            ₹{product.price.toFixed(2)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                            ₹{product.originalPrice.toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ p: 2, pt: 0, flexDirection: 'column', gap: 1 }}>
                        <Button
                          component={RouterLink}
                          to={`/products/${product.id}`}
                          variant="outlined"
                          color="primary"
                          fullWidth
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<ShoppingCartIcon />}
                          fullWidth
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ShoppingCartIcon />}
                          fullWidth
                          onClick={() => handleBuyNow(product)}
                        >
                          Buy Now
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            )}
          </AnimatePresence>
        </Grid>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        open={quickViewOpen}
        onClose={handleCloseQuickView}
        product={quickViewProduct}
      />
    </Container>
  );
}

export default Products; 