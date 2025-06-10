// Collection page
'use client';

import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  Chip,
  Alert
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useCollection } from '@/context/CollectionContext';
import { SortOptions, Amiibo } from '@/types/amiibo';

export default function CollectionPage() {
  const { collection, removeFromCollection } = useCollection();
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'name',
    direction: 'asc'
  });

  const getUniqueId = (amiibo: Amiibo) => `${amiibo.head}-${amiibo.tail}`;

  const sortedCollection = useMemo(() => {
    return [...collection].sort((a, b) => {
      let aValue: string | null;
      let bValue: string | null;

      if (sortOptions.field === 'release.na') {
        aValue = a.release.na;
        bValue = b.release.na;
      } else {
        aValue = a[sortOptions.field] as string;
        bValue = b[sortOptions.field] as string;
      }

      // Handle null values
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      const comparison = aValue.localeCompare(bValue);
      return sortOptions.direction === 'asc' ? comparison : -comparison;
    });
  }, [collection, sortOptions]);

  const handleSort = (field: keyof Amiibo | 'release.na') => {
    setSortOptions(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (collection.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          My Collection
        </Typography>
        <Alert severity="info">
          Your collection is empty. Start browsing to add some Amiibo!
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        My Collection ({collection.length} items)
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button 
          onClick={() => handleSort('name')}
          variant={sortOptions.field === 'name' ? 'contained' : 'outlined'}
          sx={{ mr: 1, mb: 1 }}
        >
          Sort by Name {sortOptions.field === 'name' && (sortOptions.direction === 'asc' ? '↑' : '↓')}
        </Button>
        <Button 
          onClick={() => handleSort('type')}
          variant={sortOptions.field === 'type' ? 'contained' : 'outlined'}
          sx={{ mr: 1, mb: 1 }}
        >
          Sort by Type {sortOptions.field === 'type' && (sortOptions.direction === 'asc' ? '↑' : '↓')}
        </Button>
        <Button 
          onClick={() => handleSort('gameSeries')}
          variant={sortOptions.field === 'gameSeries' ? 'contained' : 'outlined'}
          sx={{ mr: 1, mb: 1 }}
        >
          Sort by Series {sortOptions.field === 'gameSeries' && (sortOptions.direction === 'asc' ? '↑' : '↓')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {sortedCollection.map((amiibo) => {
          const uniqueKey = getUniqueId(amiibo);
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3}} key={uniqueKey}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={amiibo.image}
                  alt={amiibo.name}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {amiibo.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {amiibo.character}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip label={amiibo.type} size="small" sx={{ mr: 1 }} />
                    <Chip label={amiibo.gameSeries} size="small" variant="outlined" />
                  </Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => removeFromCollection(uniqueKey)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}