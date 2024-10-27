'use client'
import Image from "next/image";
import { calculateProgressPercentage } from "../services/university-management-service";
interface UniversityInfo {
    id: number;
    university_name: string;
    program_name: string;
    program_duration: string;
    gre_requirement: string;
    university_logo_url: string;
    application_deadline: string;
}
function ProgressBar({ progress, deadline }: { progress: number, deadline: string }) {
    return (
      <div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-progress-bar-color rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">Deadline:{deadline}</p>
      </div>
    );
  }
export default function UniCard({id,university_name, program_name, program_duration, gre_requirement, university_logo_url, application_deadline}: UniversityInfo) {
    const redirectToUniversityPage = (id: number) => {
        window.location.href = `/dashboard/application/university_id/${id}`
    }
    return (
        <div className = "bg-white rounded-lg p-5 w-full h-full shadow-lg flex flex-col" onClick={() => redirectToUniversityPage(id)}>
            <div className = "flex flex-row justify-between">
            <div id = "uni-card-info">
                <h1 className="text-2xl text-text-color font-bold">{program_name}</h1>
                <p className="text-base text-text-color">Duration: {program_duration}</p>
                <p className="text-base text-text-color">GRE Requirement: {gre_requirement}</p>
            </div>
            <div id = "uni-card-image-name" className="relative w-20 h-full">
                <div id = "uni-card-image" className="relative w-20 h-20">
                    <Image 
                src={university_logo_url} 
                alt={university_name} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-md"
                        />
                </div>
                <p className="text-base font-bold text-text-color">{university_name}</p>
            </div>
            </div>
            <div id = "deadline-info">
                <ProgressBar progress={calculateProgressPercentage(new Date(application_deadline).toLocaleDateString())} deadline={new Date(application_deadline).toLocaleDateString()} />
            </div>
        </div>
    )
}