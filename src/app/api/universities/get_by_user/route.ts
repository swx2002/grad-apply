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
    const result = await client.sql`
      SELECT 
        u.id, 
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
      JOIN user_university_selections uus ON uus.university_id = u.id
      LEFT JOIN degrees d ON u.degree = d.id
      LEFT JOIN majors m ON u.major = m.id
      WHERE uus.user_id = ${user_id}
    `;

    // 转换数据格式以匹配 UniversityInfo 类型
    const universities = result.rows.map(row => ({
      id: row.id,
      university_name: row.university_name,
      degree: {
        id: row.degree_id,
        name: row.degree_name
      },
      major: {
        id: row.major_id,
        name: row.major_name
      },
      program_duration: row.program_duration,
      gre_requirement: row.gre_requirement,
      university_logo_url: row.university_logo_url,
      application_deadline: row.application_deadline
    }));

    return NextResponse.json(universities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}