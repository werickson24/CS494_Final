// Controlled form component for filtering
'use client';

import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { FilterOptions } from '@/types/amiibo';

interface AmiiboFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableTypes: string[];
  availableGameSeries: string[];
  availableCharacters: string[];
}

export default function AmiiboFilters({
  filters,
  onFiltersChange,
  availableTypes,
  availableGameSeries,
  availableCharacters
}: AmiiboFiltersProps) {
  const handleFilterChange = (field: keyof FilterOptions) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    onFiltersChange({
      ...filters,
      [field]: event.target.value
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Amiibo
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3}}>
          <TextField
            fullWidth
            label="Search by Name"
            value={filters.name}
            onChange={handleFilterChange('name')}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3}}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={handleFilterChange('type')}
            >
              <MenuItem value="">All Types</MenuItem>
              {availableTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3}}>
          <FormControl fullWidth>
            <InputLabel>Game Series</InputLabel>
            <Select
              value={filters.gameSeries}
              label="Game Series"
              onChange={handleFilterChange('gameSeries')}
            >
              <MenuItem value="">All Series</MenuItem>
              {availableGameSeries.map(series => (
                <MenuItem key={series} value={series}>{series}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3}}>
          <FormControl fullWidth>
            <InputLabel>Character</InputLabel>
            <Select
              value={filters.character}
              label="Character"
              onChange={handleFilterChange('character')}
            >
              <MenuItem value="">All Characters</MenuItem>
              {availableCharacters.map(character => (
                <MenuItem key={character} value={character}>{character}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}