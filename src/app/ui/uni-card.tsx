'use client'
import Image from "next/image";

interface UniversityInfo {
    id: number;
    university_name: string;
    program_name: string;
    program_duration: string;
    gre_requirement: string;
    university_logo_url: string;
    application_deadline: string;
}

export default function UniCard({id,university_name, program_name, program_duration, gre_requirement, university_logo_url, application_deadline}: UniversityInfo) {
    const handleClick = (id: number) => {
        console.log(id);
        window.location.href = `/dashboard/application/university_id/${id}`
    }
    return (
        <div className = "bg-white rounded-md p-4" onClick={() => handleClick(id)}>
            <div className="relative w-24 h-24">
            <Image 
          src={university_logo_url} 
          alt={university_name} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-md mt-2"
        /></div>
            <h1 className="text-2xl font-bold text-black">{university_name}</h1>
            <h2 className="text-xl text-black">{program_name}</h2>
            <p className="text-lg text-black">{program_duration}</p>
            <p className="text-lg text-black">{gre_requirement}</p>
            <p className="text-lg text-black">{application_deadline}</p>
        </div>
    )
}