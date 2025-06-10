'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Avatar,
  Button,
  Chip
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { Amiibo, SortOptions } from '@/types/amiibo';
import { useCollection } from '@/context/CollectionContext';

interface AmiiboTableProps {
  amiibo: Amiibo[];
  sortOptions: SortOptions;
  onSortChange: (field: keyof Amiibo | 'release.na') => void;
}

export default function AmiiboTable({ amiibo, sortOptions, onSortChange }: AmiiboTableProps) {
  const { addToCollection, removeFromCollection, isInCollection } = useCollection();

  const handleSort = (field: keyof Amiibo | 'release.na') => {
    onSortChange(field);
  };

  const formatReleaseDate = (release: Amiibo['release']) => {
    return release.na || release.eu || release.jp || release.au || 'Unknown';
  };

  const getUniqueKey = (item: Amiibo, index: number) => {
    return `${item.head}-${item.tail}-${index}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOptions.field === 'name'}
                direction={sortOptions.field === 'name' ? sortOptions.direction : 'asc'}
                onClick={() => handleSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOptions.field === 'character'}
                direction={sortOptions.field === 'character' ? sortOptions.direction : 'asc'}
                onClick={() => handleSort('character')}
              >
                Character
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOptions.field === 'type'}
                direction={sortOptions.field === 'type' ? sortOptions.direction : 'asc'}
                onClick={() => handleSort('type')}
              >
                Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOptions.field === 'gameSeries'}
                direction={sortOptions.field === 'gameSeries' ? sortOptions.direction : 'asc'}
                onClick={() => handleSort('gameSeries')}
              >
                Game Series
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOptions.field === 'release.na'}
                direction={sortOptions.field === 'release.na' ? sortOptions.direction : 'asc'}
                onClick={() => handleSort('release.na')}
              >
                Release Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Collection</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {amiibo.map((item, index) => {
            const uniqueKey = getUniqueKey(item, index);
            const uniqueId = `${item.head}-${item.tail}`;
            
            return (
              <TableRow key={uniqueKey}>
                <TableCell>
                  <Avatar src={item.image} alt={item.name} sx={{ width: 56, height: 56 }} />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.character}</TableCell>
                <TableCell>
                  <Chip label={item.type} size="small" />
                </TableCell>
                <TableCell>{item.gameSeries}</TableCell>
                <TableCell>{formatReleaseDate(item.release)}</TableCell>
                <TableCell>
                  <Button
                    variant={isInCollection(uniqueId) ? "contained" : "outlined"}
                    color={isInCollection(uniqueId) ? "secondary" : "primary"}
                    startIcon={isInCollection(uniqueId) ? <Remove /> : <Add />}
                    onClick={() => 
                      isInCollection(uniqueId) 
                        ? removeFromCollection(uniqueId)
                        : addToCollection(item)
                    }
                    size="small"
                  >
                    {isInCollection(uniqueId) ? 'Remove' : 'Add'}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}