import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  const id: number = parseInt(request.nextUrl.searchParams.get('id') || '0');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  try {
    const client = await db.connect();
    const result = await client.sql`SELECT * FROM universities WHERE id = ${id}`;
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}