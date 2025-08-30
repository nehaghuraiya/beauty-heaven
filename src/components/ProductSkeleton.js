import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{ borderRadius: '16px 16px 0 0' }}
        />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="circular" width={24} height={24} />
          </Box>
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="30%" height={28} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="rectangular" width="50%" height={40} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width="50%" height={40} sx={{ borderRadius: 2 }} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductSkeleton; 