import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  useTheme,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Spa,
  Favorite,
  Star,
  Nature,
  Security,
  LocalShipping,
  Support,
  TrendingUp,
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Spa sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Premium Quality',
      description: 'We source only the finest beauty products from trusted brands worldwide, ensuring premium quality and effectiveness.',
    },
    {
      icon: <Favorite sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide personalized recommendations and exceptional customer service.',
    },
    {
      icon: <Star sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Expert Curation',
      description: 'Our beauty experts carefully curate each product, testing and selecting only the best for our customers.',
    },
    {
      icon: <Nature sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Eco-Friendly',
      description: 'We support sustainable beauty with eco-friendly packaging and cruelty-free product options.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Authentic Products',
      description: '100% genuine products with verified authenticity. No counterfeit items, guaranteed.',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fast Delivery',
      description: 'Quick and secure delivery across India with real-time tracking and safe packaging.',
    },
  ];

  const productCategories = [
    {
      name: 'Skincare',
      description: 'Cleansers, moisturizers, serums, and treatments for all skin types',
      products: ['Face wash', 'Sunscreen', 'Anti-aging creams', 'Acne treatments'],
    },
    {
      name: 'Makeup',
      description: 'Professional makeup products for every occasion and skin tone',
      products: ['Foundation', 'Lipsticks', 'Eyeshadows', 'Mascara'],
    },
    {
      name: 'Hair Care',
      description: 'Shampoos, conditioners, and styling products for healthy hair',
      products: ['Hair oils', 'Serums', 'Styling gels', 'Color protection'],
    },
    {
      name: 'Fragrances',
      description: 'Luxury perfumes and body mists for every mood',
      products: ['Women\'s perfumes', 'Men\'s colognes', 'Body mists', 'Gift sets'],
    },
    {
      name: 'Bath & Body',
      description: 'Nourishing body care products for soft, healthy skin',
      products: ['Body washes', 'Body lotions', 'Hand creams', 'Foot care'],
    },
    {
      name: 'Tools & Accessories',
      description: 'Professional beauty tools and accessories for perfect application',
      products: ['Makeup brushes', 'Mirrors', 'Beauty blenders', 'Storage cases'],
    },
  ];

  const stats = [
    { number: '1000+', label: 'Products Available' },
    { number: '50+', label: 'Premium Brands' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '24/7', label: 'Customer Support' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
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
            About Beauty Haven
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}
          >
            Your trusted destination for premium beauty products and expert beauty advice
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Founded with a passion for beauty and wellness, Beauty Haven has been helping customers 
            discover their perfect beauty routine since our inception. We believe that everyone deserves 
            access to high-quality beauty products that enhance their natural beauty and boost confidence.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} mb={6}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h3" component="div" color="primary.main" gutterBottom>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box mb={6}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Why Choose Beauty Haven?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[8],
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box mb={2}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Product Categories Section */}
        <Box mb={6}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Our Product Categories
          </Typography>
          <Grid container spacing={3}>
            {productCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[6],
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom color="primary.main">
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {category.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {category.products.map((product, productIndex) => (
                          <Chip
                            key={productIndex}
                            label={product}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Company Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom textAlign="center">
              Our Story
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Beauty Haven was born from a simple belief: that beauty should be accessible, authentic, and empowering. 
              What started as a small local beauty store has grown into a trusted online destination for beauty enthusiasts across India.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Our team of beauty experts works tirelessly to curate the best products, provide personalized recommendations, 
              and ensure every customer finds products that work for their unique needs. We're not just selling beauty products; 
              we're helping you discover your confidence and embrace your natural beauty.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Today, we're proud to serve thousands of satisfied customers and continue to expand our product range 
              with the latest beauty innovations and timeless classics.
            </Typography>
          </Paper>
        </motion.div>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5" component="h3">
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    To provide authentic, high-quality beauty products that enhance natural beauty and boost confidence, 
                    while delivering exceptional customer service and expert beauty advice.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Support sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5" component="h3">
                      Our Vision
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    To become India's most trusted beauty destination, known for authenticity, quality, and personalized 
                    beauty solutions that help every customer feel beautiful and confident in their own skin.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About; 