// Context provider for managing local collection
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Amiibo, CollectionContextType } from '@/types/amiibo';

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
}

interface CollectionProviderProps {
  children: ReactNode;
}

export function CollectionProvider({ children }: CollectionProviderProps) {
  const [collection, setCollection] = useState<Amiibo[]>([]);

  // Load collection from localStorage on mount
  useEffect(() => {
    const savedCollection = localStorage.getItem('amiiboCollection');
    if (savedCollection) {
      try {
        setCollection(JSON.parse(savedCollection));
      } catch (error) {
        console.error('Error parsing saved collection:', error);
        localStorage.removeItem('amiiboCollection');
      }
    }
  }, []);

  // Save collection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amiiboCollection', JSON.stringify(collection));
  }, [collection]);

  const getUniqueId = (amiibo: Amiibo) => `${amiibo.head}-${amiibo.tail}`;

  const addToCollection = (amiibo: Amiibo) => {
    const uniqueId = getUniqueId(amiibo);
    setCollection(prev => {
      if (!prev.find(item => getUniqueId(item) === uniqueId)) {
        return [...prev, amiibo];
      }
      return prev;
    });
  };

  const removeFromCollection = (amiiboId: string) => {
    setCollection(prev => prev.filter(item => getUniqueId(item) !== amiiboId));
  };

  const isInCollection = (amiiboId: string): boolean => {
    return collection.some(item => getUniqueId(item) === amiiboId);
  };

  return (
    <CollectionContext.Provider value={{
      collection,
      addToCollection,
      removeFromCollection,
      isInCollection
    }}>
      {children}
    </CollectionContext.Provider>
  );
}