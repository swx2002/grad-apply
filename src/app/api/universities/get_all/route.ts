import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function GET() {
  try {
    const client = await db.connect();
    const result = await client.sql`SELECT * FROM universities`;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}