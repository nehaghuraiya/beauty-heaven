import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  Chip,
  Rating,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const QuickViewModal = ({ open, onClose, product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    onClose();
    // Navigate to cart page
    window.location.href = '/cart';
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, scale: 0.8, y: 50 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.8, y: 50 },
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                zIndex: 1,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.paper' }
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <Grid container>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: 400,
                      objectFit: 'cover',
                      borderRadius: '16px 0 0 16px'
                    }}
                  />
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h5" component="h2" fontWeight="bold">
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
                    
                    <Chip 
                      label={product.category} 
                      color="primary" 
                      variant="outlined" 
                      size="small" 
                      sx={{ mb: 2 }}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={4.5} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        (4.5/5)
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        ₹{product.price.toFixed(2)}
                      </Typography>
                      <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        ₹{product.originalPrice.toFixed(2)}
                      </Typography>
                      <Typography variant="body1" color="success.main" fontWeight="bold">
                        20% OFF
                      </Typography>
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {product.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        fullWidth
                        size="large"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleBuyNow}
                        fullWidth
                        size="large"
                      >
                        Buy Now
                      </Button>
                    </Box>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal; 