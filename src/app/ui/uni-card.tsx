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

  export default function UniCard({
    id,
    university_name,
    program_name,
    program_duration,
    gre_requirement,
    university_logo_url,
    application_deadline,
  }: UniversityInfo) {
    const redirectToUniversityPage = (id: number) => {
      window.location.href = `/dashboard/application/university_id/${id}`;
    };
  
    return (
      <div
        className="bg-white rounded-lg p-6 w-full shadow-lg flex flex-col cursor-pointer"
        onClick={() => redirectToUniversityPage(id)}
      >
        {/* Top row: left (text) + right (logo) */}
        <div className="flex flex-row justify-between">
          <div id="uni-card-info" className="flex flex-col">
            {/* University Name (smaller text) */}
            <p className="text-sm font-semibold text-text-color mb-1">
              {university_name}
            </p>
            {/* Program Name (larger text) */}
            <h1 className="text-2xl text-text-color font-bold">
              {program_name}
            </h1>
            {/* Duration and GRE Requirement */}
            <p className="text-base text-text-color mt-2">
              Duration: {program_duration}
            </p>
            <p className="text-base text-text-color">
              GRE: {gre_requirement}
            </p>
          </div>
  
          {/* Logo on the right */}
          <div id="uni-card-image" className="relative w-20 h-20">
            <Image
              src={university_logo_url}
              alt={university_name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        </div>
  
        {/* Progress bar and deadline at the bottom */}
        <div id = "deadline-info">
        <ProgressBar progress={calculateProgressPercentage(new Date(application_deadline).toLocaleDateString() )}
  deadline={new Date(application_deadline).toLocaleDateString()}
/>
            </div>
      </div>
    );
  }
  
