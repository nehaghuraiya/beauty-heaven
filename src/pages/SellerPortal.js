import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Inventory,
  Store,
  Person,
  Dashboard,
  TrendingUp,
  AttachMoney,
  ShoppingCart,
} from '@mui/icons-material';

const SellerPortal = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Sample seller data
  const [sellerProfile, setSellerProfile] = useState({
    name: 'Beauty Haven Store',
    email: 'seller@beautyhaven.com',
    phone: '+91 9876543210',
    address: '123 Beauty Street, Mumbai, Maharashtra',
    businessType: 'Retail',
    gstNumber: 'GST123456789',
    description: 'Premium beauty products retailer with 5+ years of experience',
  });

  // Sample products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Luxury Face Cream',
      category: 'Skincare',
      price: 1299,
      originalPrice: 1599,
      stock: 50,
      status: 'Active',
      image: 'https://via.placeholder.com/150',
      description: 'Premium anti-aging face cream with natural ingredients',
    },
    {
      id: 2,
      name: 'Matte Lipstick Set',
      category: 'Makeup',
      price: 899,
      originalPrice: 1199,
      stock: 25,
      status: 'Active',
      image: 'https://via.placeholder.com/150',
      description: 'Long-lasting matte lipsticks in 6 beautiful shades',
    },
    {
      id: 3,
      name: 'Hair Growth Serum',
      category: 'Hair Care',
      price: 799,
      originalPrice: 999,
      stock: 0,
      status: 'Out of Stock',
      image: 'https://via.placeholder.com/150',
      description: 'Natural hair growth serum for stronger, healthier hair',
    },
  ]);

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    image: '',
  });

  const categories = ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Bath & Body', 'Tools & Accessories'];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      const product = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        status: 'Active',
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '', category: '', price: '', originalPrice: '', stock: '', description: '', image: ''
      });
      setOpenProductDialog(false);
      setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' });
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    setSnackbar({ open: true, message: 'Product deleted successfully!', severity: 'success' });
  };

  const handleUpdateProfile = () => {
    setOpenProfileDialog(false);
    setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
  };

  const stats = [
    { icon: <Inventory />, label: 'Total Products', value: products.length, color: 'primary.main' },
    { icon: <ShoppingCart />, label: 'Active Products', value: products.filter(p => p.status === 'Active').length, color: 'success.main' },
    { icon: <AttachMoney />, label: 'Total Value', value: `₹${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}`, color: 'warning.main' },
    { icon: <TrendingUp />, label: 'Low Stock', value: products.filter(p => p.stock < 10 && p.stock > 0).length, color: 'error.main' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Seller Portal
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your products and seller account
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: stat.color, mb: 1 }}>
                      {React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}
                    </Box>
                    <Typography variant="h4" component="div" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab icon={<Dashboard />} label="Dashboard" />
            <Tab icon={<Inventory />} label="Products" />
            <Tab icon={<Store />} label="Store Profile" />
            <Tab icon={<Person />} label="Account" />
          </Tabs>
        </Paper>

        {/* Dashboard Tab */}
        {activeTab === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Recent Products
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {products.slice(0, 5).map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>₹{product.price}</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <Chip
                                  label={product.status}
                                  color={product.status === 'Active' ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenProductDialog(true)}
                        fullWidth
                      >
                        Add New Product
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => setOpenProfileDialog(true)}
                        fullWidth
                      >
                        Edit Profile
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Product Management</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenProductDialog(true)}
              >
                Add Product
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={product.status}
                          color={product.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDeleteProduct(product.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </motion.div>
        )}

        {/* Store Profile Tab */}
        {activeTab === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Store Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Store Name
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {sellerProfile.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Business Type
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {sellerProfile.businessType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      GST Number
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {sellerProfile.gstNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {sellerProfile.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setOpenProfileDialog(true)}
                  >
                    Edit Store Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Account Tab */}
        {activeTab === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Account Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Contact Information
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      <strong>Email:</strong> {sellerProfile.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      <strong>Phone:</strong> {sellerProfile.phone}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Address:</strong> {sellerProfile.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Account Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button variant="outlined" fullWidth>
                        Change Password
                      </Button>
                      <Button variant="outlined" fullWidth>
                        Update Contact Info
                      </Button>
                      <Button variant="outlined" color="error" fullWidth>
                        Deactivate Account
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Add Product Dialog */}
        <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newProduct.category}
                    label="Category"
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Original Price (₹)"
                  type="number"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
            <Button onClick={handleAddProduct} variant="contained">Add Product</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Profile Dialog */}
        <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Edit Store Profile</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Store Name"
                  value={sellerProfile.name}
                  onChange={(e) => setSellerProfile({ ...sellerProfile, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={sellerProfile.email}
                  onChange={(e) => setSellerProfile({ ...sellerProfile, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={sellerProfile.phone}
                  onChange={(e) => setSellerProfile({ ...sellerProfile, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="GST Number"
                  value={sellerProfile.gstNumber}
                  onChange={(e) => setSellerProfile({ ...sellerProfile, gstNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={sellerProfile.address}
                  onChange={(e) => setSellerProfile({ ...sellerProfile, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={sellerProfile.description}
                  onChange={(e) => setSellerProfile({ ...sellerProfile, description: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenProfileDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateProfile} variant="contained">Update Profile</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default SellerPortal; 