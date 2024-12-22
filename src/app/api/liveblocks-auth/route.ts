import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
const API_KEY = "sk_prod_BdCnwIKNKaUdQxiu_4-VZ8rH8_cdX-KB0Zk9d23QTqixEbamIVucIWu7xOKAyx6M";

const liveblocks = new Liveblocks({
  secret: API_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's info from your database
  const userSession = await getServerSession(authOptions);
  if (!userSession) {
    return new Response("Unauthorized", { status: 401 });
  }
  const email = userSession.user.email;
  if (!email) {
    return new Response("Email is required", { status: 400 });
  }
  // get user info from database by sending GET request to /api/users/get_user_info_by_email, add email to end of url
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/get_user_info_by_email?email=${email}`, { cache: 'no-store' }).then(res => res.json());
// response is like {"id":3,"username":"zzz","email":"12345678@gmail.com"}, fit it into a user object
  console.log(response);
  const user = {
    id: String(response.id),
    info: {
      name: response.username,
      color: "#D583F0",
      picture: "https://liveblocks.io/avatars/avatar-1.png",
    },
  };
  console.log(user);
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