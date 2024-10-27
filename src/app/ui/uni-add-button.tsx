'use client'
import { PlusIcon } from '@heroicons/react/24/solid';
import {useState} from 'react';
import { UniversityInfo } from '../lib/definitions';
import { useSession } from 'next-auth/react';
import { fetchAllUniversities } from '../services/university-management-service';
import { selectAndAddUniversity } from '../services/university-management-service';
export default function UniAddButton() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [universities, setUniversities] = useState<UniversityInfo[]>([]);
    const session = useSession();
    const toggleUniversityDropdown = async () => {
        try {
            const data: UniversityInfo[] = await fetchAllUniversities();
            setUniversities(data);
            setShowDropdown(!showDropdown);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className = "bg-white rounded-lg p-5 w-full h-full shadow-lg flex justify-center items-center">
        <button id = "uni-add-button" onClick={toggleUniversityDropdown} className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-gray-500 border-dashed border-2" >
            <PlusIcon className="w-16 h-16 text-gray-500"/>
        </button>
        {showDropdown && (
            <div id = "uni-add-dropdown" className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
                <select className="w-full p-2 border border-gray-300 rounded-md" onChange={
                    (e) => {
                        selectAndAddUniversity(e, session);
                        setShowDropdown(false);
                        setUniversities([]);
                    }}>
                    {universities.map((university:any) => (
                        <option key={university.id} value={university.id}>
                            {university.university_name}
                            {university.program_name}
                        </option>
                    ))}
                </select>
            </div>
        )}
    </div>)
}