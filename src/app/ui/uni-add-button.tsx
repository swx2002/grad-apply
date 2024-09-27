'use client'
import { PlusIcon } from '@heroicons/react/24/solid';
import {useState} from 'react';
import { UniversityInfo } from '../lib/definitions';
import { useSession } from 'next-auth/react';
async function fetchUniversities() {
    const res = await fetch('/api/universities/get_all');
    const data = await res.json();
    console.log(data);
    return data;
}
export default function UniAddButton() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [universities, setUniversities] = useState<UniversityInfo[]>([]);
    const session = useSession();
    const handleClick = async () => {
        try {
            const data: UniversityInfo[] = await fetchUniversities();
            setUniversities(data);
            setShowDropdown(!showDropdown);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUniversityId = e.target.value;
        const selectedUniversity = universities.find(university => university.id === parseInt(selectedUniversityId));
        console.log(selectedUniversity);
        const res = await fetch('${process.env.NEXT_PUBLIC_API_BASE_URL}/api/universities/add', {
            method: 'POST',
            body: JSON.stringify({university_id: selectedUniversityId, user_id: session.data?.user?.id}),
        });
        console.log(res);
        if (res.ok) {
            console.log('University added successfully');
        } else {
            console.error('Failed to add university');
        }
        setShowDropdown(false);
        setUniversities([]);
        //refresh the page
        window.location.reload();
    }
    return (
        <div>
        <button onClick={handleClick} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center" >
            <PlusIcon className="w-6 h-6 text-white"/>
        </button>
        {showDropdown && (
            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
                <select className="w-full p-2 border border-gray-300 rounded-md" onChange={(e) => handleSelect(e)}>
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