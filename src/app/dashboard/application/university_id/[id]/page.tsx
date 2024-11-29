import { UniversityInfo, RefereeInfo } from "@/app/lib/definitions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import RefereeAddButton from "@/app/ui/referee-add-button";

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
        console.log(res);
        if (!res.ok) {
            throw new Error('Failed to fetch applications');
        }
        return res.json();
    }

    const universityInfo: UniversityInfo = await getUniversityById(university_id);
    const refereesInfo: RefereeInfo[] = await getRefereesByUserId(user_id,university_id);
    console.log(refereesInfo);
    return (
        <div>
            <div id = "university-info">
            <h1>{universityInfo.university_name}</h1>
            <p>{universityInfo.program_name}</p>
            <p>{universityInfo.program_duration}</p>
            <p>{universityInfo.gre_requirement}</p>
            <p>{universityInfo.university_logo_url}</p>
            <p>{universityInfo.application_deadline}</p>
            </div>
            <div id = "recommendation-info">
                <h1>Recommendation Letters</h1>
                <RefereeAddButton />
                {refereesInfo.map((referee) => (
                    <div key={referee.id}>
                        <p>Referee Name: {referee.name}</p>   
                        <p>Referee Position: {referee.position}</p>
                        <p>Referee Email: {referee.email}</p>
                        <p>Referee Institution: {referee.institution}</p>
                        <p>Referee Recommendation Status: {referee.recommendation_status}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}