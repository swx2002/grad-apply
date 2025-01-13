import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function GET() {
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
LEFT JOIN majors m ON u.major = m.id `;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}