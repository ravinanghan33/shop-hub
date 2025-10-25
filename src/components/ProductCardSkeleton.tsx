import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={240} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" height={60} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="text" width={40} />
        </Box>
        <Skeleton variant="text" height={40} width={100} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={36} />
      </CardContent>
    </Card>
  );
};
