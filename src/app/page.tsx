// Main browse page
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import AmiiboFilters from '@/components/AmiiboFilters';
import AmiiboTable from '@/components/AmiiboTable';
import { Amiibo, FilterOptions, SortOptions } from '@/types/amiibo';

export default function HomePage() {
  const [amiibo, setAmiibo] = useState<Amiibo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    name: '',
    type: '',
    gameSeries: '',
    character: ''
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'name',
    direction: 'asc'
  });

  // Fetch data from API route
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/amiibo');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAmiibo(data.amiibo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const types = [...new Set(amiibo.map(item => item.type))].sort();
    const gameSeries = [...new Set(amiibo.map(item => item.gameSeries))].sort();
    const characters = [...new Set(amiibo.map(item => item.character))].sort();
    
    return { types, gameSeries, characters };
  }, [amiibo]);

  // Filter and sort amiibo
  const filteredAndSortedAmiibo = useMemo(() => {
    const filtered = amiibo.filter(item => {
      return (
        item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.type === '' || item.type === filters.type) &&
        (filters.gameSeries === '' || item.gameSeries === filters.gameSeries) &&
        (filters.character === '' || item.character === filters.character)
      );
    });

    // Sort the filtered results
    return filtered.toSorted((a, b) => {
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
  }, [amiibo, filters, sortOptions]);

  const handleSortChange = (field: keyof Amiibo | 'release.na') => {
    setSortOptions(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Browse Amiibo
      </Typography>
      
      <AmiiboFilters
        filters={filters}
        onFiltersChange={setFilters}
        availableTypes={filterOptions.types}
        availableGameSeries={filterOptions.gameSeries}
        availableCharacters={filterOptions.characters}
      />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          Showing {filteredAndSortedAmiibo.length} of {amiibo.length} Amiibo
        </Typography>
      </Box>

      <AmiiboTable
        amiibo={filteredAndSortedAmiibo}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
      />
    </Container>
  );
}