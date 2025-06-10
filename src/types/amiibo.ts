export interface Amiibo {
  amiiboSeries: string;
  character: string;
  gameSeries: string;
  head: string;
  image: string;
  name: string;
  release: {
    au: string | null;
    eu: string | null;
    jp: string | null;
    na: string | null;
  };
  tail: string;
  type: string;
}

export interface AmiiboResponse {
  amiibo: Amiibo[];
}

export interface FilterOptions {
  name: string;
  type: string;
  gameSeries: string;
  character: string;
}

export interface SortOptions {
  field: keyof Amiibo | 'release.na';
  direction: 'asc' | 'desc';
}

export interface CollectionContextType {
  collection: Amiibo[];
  addToCollection: (amiibo: Amiibo) => void;
  removeFromCollection: (amiiboHead: string) => void;
  isInCollection: (amiiboHead: string) => boolean;
}