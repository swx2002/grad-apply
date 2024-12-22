import { db, sql } from '@vercel/postgres';
import { NextRequest} from 'next/server';
import { User } from '@/app/lib/definitions';
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return new Response('Email is required', { status: 400 });
  }

  const client = await db.connect();
  try {
    const users = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const user = users.rows[0];
    // remove hashedpassword from user
    const { hashedpassword, ...userWithoutHashedPassword } = user;
    if (!user) {
        return new Response('User not found', { status: 404 });
    }
    return new Response(JSON.stringify(userWithoutHashedPassword), { status: 200 });
  } catch (error) {
    return new Response('Database connection or query error', { status: 500 });
  } finally {
    client.release();
  }
}