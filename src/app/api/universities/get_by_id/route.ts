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
    const result = await client.sql`SELECT u.id, 
    u.university_name,
    u.program_duration,
    u.gre_requirement,
    u.university_logo_url,
    u.application_deadline,
    d.id AS degree_id,
    d.degree_name AS degree_name,
    m.id AS major_id,
    m.major_name AS major_name
FROM universities u
LEFT JOIN degrees d ON u.degree = d.id
LEFT JOIN majors m ON u.major = m.id WHERE u.id = ${id}`;
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}