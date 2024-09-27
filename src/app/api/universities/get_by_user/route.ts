import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  const user_id = request.nextUrl.searchParams.get('user_id');
  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  try {
    const client = await db.connect();
    const result = await client.sql`SELECT * FROM universities JOIN user_university_selections ON user_university_selections.university_id = universities.id WHERE user_university_selections.user_id = ${user_id}`;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}