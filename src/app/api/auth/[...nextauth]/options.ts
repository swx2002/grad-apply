import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from 'bcryptjs';
import { User } from '@/app/lib/definitions';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text', placeholder: 'name' },
        email: { label: 'email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'password', type: 'password', placeholder: 'password' }
      },
      async authorize(credentials, req) {
        const { name, email, password } = credentials as { name: string, email: string, password: string };
        if (!name || !email || !password) {
          return null;
        }
        try {
          const users = await sql<User>`SELECT * FROM users WHERE email=${email}`;
          const user = users.rows[0];
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.hashedpassword);
          if (!passwordMatch) return null;
          return user;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        id: token.id as number,
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
}