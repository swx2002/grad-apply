import { db } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return new Response('Name, email, and password are required', { status: 400 });
  }

  const client = await db.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.sql`
      INSERT INTO users (username, email, hashedpassword)
      VALUES (${name}, ${email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;

    return new Response('User added successfully', { status: 201 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  } finally {
    client.release();
  }
}