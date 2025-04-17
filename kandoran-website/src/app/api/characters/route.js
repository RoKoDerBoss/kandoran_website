import { NextResponse } from 'next/server';

// Cache duration (4 hours in seconds)
export const revalidate = 14400;

export async function GET() {
  try {
    const repoOwner = 'RoKoDerBoss';
    const repoName = 'kandoran_website';
    const branch = 'main';
    
    const response = await fetch(
      `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/data/characters.json`,
      { next: { revalidate } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=14400, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    );
  }
}