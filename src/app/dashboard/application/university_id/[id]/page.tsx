import { UniversityInfo, RefereeInfo } from "@/app/lib/definitions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import RefereeAddButton from "@/app/ui/referee-add-button";
import NextImage from 'next/image';

export default async function UniversityApplicationPage({ params }: any) {
    const university_id = parseInt(params.id);

    const user_id = (await getServerSession(authOptions))?.user.id;
    if (!user_id) {
        return <div>Please login to view your universities</div>;
    }
    async function getUniversityById(id: number) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/universities/get_by_id?id=${id}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch applications');
        }
        return res.json();
    }
    async function getRefereesByUserId(user_id: number, university_id: number) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/referees/get_by_user?user_id=${user_id}&university_id=${university_id}`, {cache: 'no-store'});
        if (!res.ok) {
            throw new Error('Failed to fetch applications');
        }
        return res.json();
    }

    async function formatDateToYMD(dateString: string) {
        const dateObj = new Date(dateString);
        // toISOString() -> "2024-01-01T05:00:00.000Z"
        // substring(0,10) -> "2024-01-01"
        return dateObj.toISOString().substring(0, 10);
      }

    const universityInfo: UniversityInfo = await getUniversityById(university_id);
    const refereesInfo: RefereeInfo[] = await getRefereesByUserId(user_id,university_id);
    return (
        <div className="p-6">
        {/* Large Title (e.g., "Yale University") */}
        <h1 className="text-4xl font-bold text-primary mb-2 text-text-color">
          {universityInfo.university_name}
        </h1>
  
        {/* Subheading: General Info */}
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          General Information
        </h2>
  
        {/* Program Info Card */}
        <div className="bg-white rounded-md border  p-6 shadow-md flex flex-row items-center justify-between">
          {/* Left side: Program details */}
          <div className="flex-1">
            {/* Program Title + Optional Edit Icon */}
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-bold text-text-color">
                {universityInfo.degree.name}
              </h3>
              <button className="text-sm text-blue-500 hover:underline ml-2">
                ✏️
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Duration: {universityInfo.program_duration}
            </p>
            <p className="text-sm text-gray-600">
              GRE: {universityInfo.gre_requirement}
            </p>
  
            {/* If you have a creation date, you can show it here */}
            {/* <p className="text-sm text-gray-400 mt-2">
              Created: 11/05/2024 (example)
            </p> */}
          </div>
  
          {/* Right side: Logo + Deadline */}
          <div className="flex flex-col items-end space-y-2 ml-6">
          <div id="uni-card-image" className="relative w-20 h-20">
          <NextImage
            src={universityInfo.university_logo_url}
            alt={universityInfo.university_name}
            fill
             style={{ objectFit: 'cover' }}
            className="rounded-md"
             />
          </div>
           
            <p className="text-sm text-gray-500">
            Deadline: {formatDateToYMD(universityInfo.application_deadline)}
            </p>
          </div>
        </div>
  
       
  
        {/* Add button + possible icons */}
        <div className="flex items-center justify-between mt-8 mb-4">
             {/* Left: Heading */}
                 <h2 className="text-lg font-semibold text-gray-600">
                     Letter of Recommendations:
                </h2>

            {/* Right: Plus button & optional icons */}
                <div className="flex items-center space-x-2">
                 <RefereeAddButton />
            </div>
         </div>
  
        {/* Referee Cards */}
        <div className="space-y-4">
          {refereesInfo.map((referee) => (
            <div
              key={referee.id}
              className="bg-white rounded-md p-4 shadow-sm flex flex-row items-center justify-between"
            >
              {/* Left side: "Avatar" + details */}
              <div className="flex flex-row items-center space-x-4">
                {/* Circular avatar with initial */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                  {referee.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {referee.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {referee.position}, {referee.institution}
                  </p>
                </div>
              </div>
              {/* Right side: Edit button/icon, or status */}
              <div className="flex items-center space-x-4">
                {/* Recommendation Status (optional) */}
                <span className="text-sm text-gray-500">
                  Status: {referee.recommendation_status}
                </span>
                {/* Edit icon button */}
                <button className="text-blue-500 hover:underline text-sm flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M2 16.5V21h4.5l11-11-3.536-3.536L2 16.5z"
                    />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}