import NextAuth from 'next-auth';
import dotenv from 'dotenv';
import { DefaultSession } from 'next-auth';
import { authOptions } from './options';
dotenv.config();
declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      id?: number;
    } & DefaultSession["user"]
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

