
import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const user_id = request.nextUrl.searchParams.get('user_id');
    const university_id = request.nextUrl.searchParams.get('university_id');
    if (!user_id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    if (!university_id) {
        return NextResponse.json({ error: 'University ID is required' }, { status: 400 });
    }
    try {
        const client = await db.connect();
        // Type is RefereeInfo
        const result = await client.sql`SELECT referees.* FROM referees JOIN user_referee_relation ON user_referee_relation.referee_id = referees.id WHERE user_referee_relation.user_id = ${user_id} AND user_referee_relation.university_id = ${university_id}`;
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching referees:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}