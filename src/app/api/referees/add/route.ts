import { NextResponse, NextRequest } from 'next/server';
import { db } from '@vercel/postgres';

interface addRefereeRequest {
    name: string,
    email: string,
    position: string,
    institution: string,
    user_id: number,
    university_id: number
}
export async function POST(request: NextRequest) {
    // print out request body as json
    const selectionInfo:addRefereeRequest = await request.json();
    console.log(selectionInfo);
    const referee_name = selectionInfo.name;
    const referee_email = selectionInfo.email;
    const referee_position = selectionInfo.position;
    const referee_institution = selectionInfo.institution;
    const user_id = selectionInfo.user_id;
    const university_id = selectionInfo.university_id;
    const recommendation_status = 'None';
  try {
    const client = await db.connect();
    // add referee to referees table first, then get referee_id and add to user_university_referees table
    const result = await client.sql`INSERT INTO referees (name, email, position, institution,recommendation_status) VALUES (${referee_name}, ${referee_email}, ${referee_position}, ${referee_institution},${recommendation_status}) RETURNING id`;
    const referee_id = result.rows[0].id;
    await client.sql`INSERT INTO user_referee_relation (user_id, university_id, referee_id) VALUES (${user_id}, ${university_id}, ${referee_id})`;
    return NextResponse.json({ message: 'Referee added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}