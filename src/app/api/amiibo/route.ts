import { NextResponse } from 'next/server';
import { fetchAllAmiibo, fetchAmiiboByType, fetchAmiiboByGameSeries } from '@/lib/amiiboApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const gameSeries = searchParams.get('gameseries');

  try {
    let data;
    
    if (type) {
      data = await fetchAmiiboByType(type);
    } else if (gameSeries) {
      data = await fetchAmiiboByGameSeries(gameSeries);
    } else {
      data = await fetchAllAmiibo();
    }

    return NextResponse.json({ amiibo: data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch amiibo data' },
      { status: 500 }
    );
  }
}