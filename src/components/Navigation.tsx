'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Collections, Home } from '@mui/icons-material';
import Link from 'next/link';
import { useCollection } from '@/context/CollectionContext';

export default function Navigation() {
  const { collection } = useCollection();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Amiibo API Explorer
        </Typography>
        <Button color="inherit" component={Link} href="/" startIcon={<Home />}>
          Browse
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          href="/collection"
          startIcon={
            <Badge badgeContent={collection.length} color="secondary">
              <Collections />
            </Badge>
          }
        >
          My Collection
        </Button>
      </Toolbar>
    </AppBar>
  );
}