import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const uni_id = parseInt(request.nextUrl.searchParams.get('uni_id') || '');
  const major_id = parseInt(request.nextUrl.searchParams.get('major_id') || '');

  if (isNaN(uni_id) || isNaN(major_id)) {
    return NextResponse.json(
      { error: 'Invalid parameters. Both uni_id and major_id must be numbers' }, 
      { status: 400 }
    );
  }

  try {
    const client = await db.connect();
    const result = await client.sql`
      SELECT DISTINCT d.id, d.degree_name
      FROM universities u
      JOIN degrees d ON u.degree = d.id
      WHERE u.id = ${uni_id}
      AND u.major = ${major_id}
    `;
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching degrees:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

