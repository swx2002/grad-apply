import { UniversityInfo } from "@/app/lib/definitions";
export default async function ApplicationPage({params}: {params: {id: string}}) {
    const id = params.id;
    async function getUniversityById(id: number) {
        const res = await fetch(`http://localhost:3000/api/universities/get_by_id?id=${id}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch applications');
        }
        return res.json();
    }
    const universityInfo: UniversityInfo = await getUniversityById(parseInt(id));
    return (
        <div>
            <h1>{universityInfo.university_name}</h1>
            <p>{universityInfo.program_name}</p>
            <p>{universityInfo.program_duration}</p>
            <p>{universityInfo.gre_requirement}</p>
            <p>{universityInfo.university_logo_url}</p>
            <p>{universityInfo.application_deadline}</p>
        </div>
    )
}