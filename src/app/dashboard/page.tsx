import UniCard from "../ui/uni-card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import UniAddButton from "../ui/uni-add-button";
import { UniversityInfo } from "../lib/definitions";

async function getUniversitiesByUser(): Promise<UniversityInfo[]> {
    const session = await getServerSession(authOptions);
    if (!session) {
        return [];
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/universities/get_by_user?user_id=${session?.user.id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch universities');
    }
    return res.json();
  }

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const universities = await getUniversitiesByUser();
    console.log(universities);
    if (!session) {
        return <div>Please login to view your universities</div>;
    }
    return (
        <div className="grid grid-cols-3 gap-4 content-start justify-items-start h-screen overflow-y-auto">
            {universities.map((university) => (
                <UniCard key={university.id} {...university} />
            ))}
            <UniAddButton />
        </div>
    )
}