import { AmiiboResponse, Amiibo } from '@/types/amiibo';

const BASE_URL = 'https://www.amiiboapi.com/api/amiibo';

export async function fetchAllAmiibo(): Promise<Amiibo[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch amiibo data');
    }
    const data: AmiiboResponse = await response.json();
    return data.amiibo;
  } catch (error) {
    console.error('Error fetching amiibo:', error);
    throw error;
  }
}

export async function fetchAmiiboByType(type: string): Promise<Amiibo[]> {
  try {
    const response = await fetch(`${BASE_URL}/?type=${encodeURIComponent(type)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch amiibo data');
    }
    const data: AmiiboResponse = await response.json();
    return data.amiibo;
  } catch (error) {
    console.error('Error fetching amiibo by type:', error);
    throw error;
  }
}

export async function fetchAmiiboByGameSeries(gameSeries: string): Promise<Amiibo[]> {
  try {
    const response = await fetch(`${BASE_URL}/?gameseries=${encodeURIComponent(gameSeries)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch amiibo data');
    }
    const data: AmiiboResponse = await response.json();
    return data.amiibo;
  } catch (error) {
    console.error('Error fetching amiibo by game series:', error);
    throw error;
  }
}