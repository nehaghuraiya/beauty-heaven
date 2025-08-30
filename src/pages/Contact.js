import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';

const Contact = () => {
  const theme = useTheme();

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Phone Number',
      detail: '+91 7999618020',
      description: 'Call us for any inquiries or support',
    },
    {
      icon: <Email sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Email Address',
      detail: 'abc@gmail.com',
      description: 'Send us an email anytime',
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Address',
      detail: 'Hello World',
      description: 'Visit our location',
    },
    {
      icon: <AccessTime sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Business Hours',
      detail: 'Mon - Sat: 9:00 AM - 8:00 PM',
      description: 'Sunday: 10:00 AM - 6:00 PM',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Get in touch with us for any questions, support, or business inquiries.
            We're here to help you with all your beauty product needs.
          </Typography>
        </Box>

        <Grid container spacing={4} mb={6}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
                      {info.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="p"
                      color="primary.main"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {info.detail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Let's Connect!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We value your feedback and are always looking for ways to improve our services.
              Don't hesitate to reach out to us through any of the contact methods above.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              For urgent matters, please call us directly. For general inquiries, 
              email us and we'll get back to you within 24 hours.
            </Typography>
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Contact; 