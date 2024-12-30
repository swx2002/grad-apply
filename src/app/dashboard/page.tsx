import UniCard from "../ui/uni-card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import UniAddButton from "../ui/uni-add-button";
import { UniversityInfo } from "../lib/definitions";
import { BellIcon } from "@heroicons/react/20/solid";
import { MoonIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import UserPanel from "../ui/user-panel";

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
        <div id = "dashboard-container">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-5xl font-bold text-text-color">Dashboard</h1>
                <div id = "search-container" className="shadow-md flex items-center space-x-4 rounded-3xl p-2 bg-white w-2/3 h-20" >
                    <input type="text" placeholder="Search" className=" shadow-inner bg-indigo-50 px-4 py-2 rounded-full border h-14 w-2/3" />
                    <button className="p-1 rounded-full bg-white">
                        <BellIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <button className="p-1 rounded-full bg-white">
                        <MoonIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <button className="p-1 rounded-full bg-white">
                        <InformationCircleIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <UserPanel />
                </div>
            </header>
            <div id = "universities-container" className="grid grid-cols-2 grid-rows-3 gap-5 content-start justify-items-start h-screen overflow-y-auto">
                {universities.map((university) => (
                    <UniCard key={university.id} {...university} />
                ))}
                <UniAddButton />
            </div>
        </div>
    )
}