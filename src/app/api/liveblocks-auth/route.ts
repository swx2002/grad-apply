import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  if (!process.env.LIVEBLOCKS_SECRET) {
    return new Response("LIVEBLOCKS_SECRET is not set", { status: 500 });
  }
  const API_KEY = process.env.LIVEBLOCKS_SECRET;
  // Get the current user's info from your database
  const liveblocks = new Liveblocks({
    secret: API_KEY!,
  });
  const userSession = await getServerSession(authOptions);
  if (!userSession) {
    return new Response("Unauthorized", { status: 401 });
  }
  const email = userSession.user.email;
  if (!email) {
    return new Response("Email is required", { status: 400 });
  }
  // get user info from database by sending GET request to /api/users/get_user_info_by_email, add email to end of url
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/get_user_info_by_email?email=${email}`, { cache: 'no-store' });
  if (!response.ok) {
    return new Response("Failed to fetch user info", { status: 500 });
  }
  const userInfo = await response.json();

  // response is like {"id":3,"username":"zzz","email":"12345678@gmail.com"}, fit it into a user object
  const user = {
    id: String(userInfo.id),
    info: {
      name: userInfo.username,
      color: "#D583F0",
      picture: "https://liveblocks.io/avatars/avatar-1.png",
    },
  };
  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(user.id, {
    userInfo: user.info,
  });
  // Give the user access to the room
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}