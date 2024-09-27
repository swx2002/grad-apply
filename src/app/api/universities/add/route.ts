import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

interface addRequest {
    university_id:number,
    user_id: number
}
export async function POST(req: Request) {
    console.log("Request body:");
    // print out request body as json
    const selectionInfo:addRequest = await req.json();
    const university_id = selectionInfo.university_id;
    const user_id = selectionInfo.user_id;

  try {
    const client = await db.connect();
    const result = await client.sql`INSERT INTO user_university_selections (user_id,university_id) VALUES (${user_id}, ${university_id})`;
    return NextResponse.json({ message: 'University added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}