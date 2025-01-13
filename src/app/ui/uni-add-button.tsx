'use client';

import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { UniversityInfo, DegreeInfo } from '../lib/definitions';
import {
  fetchAllUniversities,
  selectAndAddUniversity,
  getDegreesByUniMajor
} from '../services/university-management-service';

import 'react-datepicker/dist/react-datepicker.css';


export default function UniAddButton() {
  const { data: session } = useSession();
  const router = useRouter();  

  // Toggle for the full-screen form
  const [showForm, setShowForm] = useState(false);

  // Dropdown data
  const [universities, setUniversities] = useState<UniversityInfo[]>([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [availableDegrees, setAvailableDegrees] = useState<DegreeInfo[]>([]);
  // Additional fields
  const [area, setArea] = useState('');
  const [program, setProgram] = useState('');

  // 从 universities 中提取不重复的 majors
  const distinctMajors = useMemo(() => {
    // 使用 Map 来存储唯一的 major，使用 major.id 作为键
    const majorsMap = new Map();
    
    universities.forEach(uni => {
      const { major } = uni;
      if (!majorsMap.has(major.id)) {
        majorsMap.set(major.id, {
          id: major.id,
          major_name: major.name
        });
      }
    });

    // 转换 Map 为数组
    return Array.from(majorsMap.values());
  }, [universities]);

  // 添加 useMemo hook 来获取不重复的大学
  const distinctUniversities = useMemo(() => {
    const uniqueUnis = new Map();
    universities.forEach(uni => {
      if (!uniqueUnis.has(uni.university_name)) {
        uniqueUnis.set(uni.university_name, {
          id: uni.id,
          university_name: uni.university_name
        });
      }
    });
    return Array.from(uniqueUnis.values());
  }, [universities]);

  // Open/close form & load universities if opening
  const toggleForm = async () => {
    if (!showForm) {
      try {
        const unis = await fetchAllUniversities();
        setUniversities(unis);
      } catch (err) {
        console.error('Failed to fetch universities:', err);
      }
    }
    setShowForm(!showForm);
  };

  // Track changes
  function handleSelectUniversity(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUniversityId(e.target.value);
  }

  async function handleSelectMajor(e: React.ChangeEvent<HTMLSelectElement>) {
    const majorId = e.target.value;
    setSelectedMajor(majorId);
    setArea(majorId); // 确保 area 也被更新

    try {
      const degrees = await getDegreesByUniMajor(
        selectedUniversityId,
        majorId
      );
      setAvailableDegrees(degrees || []);
    } catch (error) {
      console.error('Error fetching degrees:', error);
      setAvailableDegrees([]);
    }
  }

  // Helper: check if a field is filled
  const isFilled = (value: string | Date | null) => {
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    return value !== null; // for the Date
  };

  // Only enable “Save” if all fields are filled
  const canSave =
    isFilled(selectedUniversityId) &&
    isFilled(area) &&
    isFilled(program)

  // Handle final submission
  const handleAddProgram = () => {
    if (!session) {
      alert('You must be logged in to add a program.');
      return;
    }
    if (!selectedUniversityId) {
      alert('Please select a school.');
      return;
    }

    // Construct a faux event object for `selectAndAddUniversity`
    const AddEvent = {
      target: { value: selectedUniversityId },
    } as React.ChangeEvent<HTMLSelectElement>;

    // POST to /api/universities/add
    selectAndAddUniversity(AddEvent, session);
    router.refresh();

    // Clear and close
    setSelectedUniversityId('');
    setArea('');
    setProgram('');
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-lg p-5 w-full h-full shadow-lg flex justify-center items-center relative">
      {/* The PLUS button (visible if form is not open) */}
      {!showForm && (
        <button
          id="uni-add-button"
          onClick={toggleForm}
          className="w-32 h-32 bg-white rounded-full flex items-center 
                     justify-center border-gray-500 border-dashed border-2"
        >
          <PlusIcon className="w-16 h-16 text-gray-500" />
        </button>
      )}

      {/* Full-screen overlay (form) */}
      {showForm && (
        <div
          className="
            fixed top-0 left-0 
            w-screen h-screen 
            bg-white 
            z-50 
            p-8
            flex flex-col
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">Selecting a Program...</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 text-3xl"
            >
              ✕
            </button>
          </div>

          {/* Form fields */}
          <div className="flex flex-col space-y-8 w-full max-w-3xl">
            {/* School */}
            <div className="flex items-center space-x-3">
              {/* Outlined container (floating label) */}
              <div className="relative border-2 border-[#65558f] rounded-md px-4 py-4 flex-1">
                <span className="absolute -top-3 left-3 bg-white text-sm font-semibold text-[#65558f] px-1">
                  School
                </span>
                <select
                  className="bg-transparent w-full text-lg focus:outline-none"
                  value={selectedUniversityId}
                  onChange={handleSelectUniversity}
                >
                  <option value="">-- Select a School --</option>
                  {distinctUniversities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.university_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Green check (outside the border container) */}
              {isFilled(selectedUniversityId) && (
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
              )}
            </div>

            {/* Area */}
            <div className="flex items-center space-x-3">
              <div className="relative border-2 border-[#65558f] rounded-md px-4 py-4 flex-1">
                <span className="absolute -top-3 left-3 bg-white text-sm font-semibold text-[#65558f] px-1">
                  Area
                </span>
                <select
                  className="bg-transparent w-full text-lg focus:outline-none"
                  value={area}
                  onChange={handleSelectMajor}
                >
                  <option value="">-- Select an Area --</option>
                  {distinctMajors.map((major) => (
                    <option key={major.id} value={major.id}>
                      {major.major_name}
                    </option>
                  ))}
                </select>
              </div>
              {isFilled(area) && (
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
              )}
            </div>

            {/* Program */}
            <div className="flex items-center space-x-3">
              <div className="relative border-2 border-[#65558f] rounded-md px-4 py-4 flex-1">
                <span className="absolute -top-3 left-3 bg-white text-sm font-semibold text-[#65558f] px-1">
                  Program
                </span>
                <select
                  className="bg-transparent w-full text-lg focus:outline-none"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                >
                  <option value="">-- Select a Program --</option>
                  {availableDegrees.map((degree) => (
                    <option key={degree.id} value={degree.id}>
                      {degree.name}
                    </option>
                  ))}
                </select>
              </div>
              {isFilled(program) && (
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
              )}
            </div>
          </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-4 mt-10">
            {/* Cancel: outlined, pill-shaped button */}
             <button
                 onClick={() => setShowForm(false)}
                    className="
                  px-6 
                  py-3 
                  border 
                  border-[#65558f]
                  text-[#65558f] 
                  font-semibold 
                  rounded-full 
                  text-lg
                  hover:bg-[#65558f]/10 
                   transition
                 "
             >
             Cancel
              </button>

            {/* Save: solid purple, pill-shaped button */}
             <button
                  onClick={handleAddProgram}
                 disabled={!canSave}
                 className={`
                 px-6 
                 py-3 
                  rounded-full 
                  text-lg 
                  font-semibold 
                  transition 
      ${
            canSave
          ? "bg-[#65558f] text-white hover:opacity-90"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
  >
    Save
  </button>
</div>

        </div>
      )}
    </div>
  );
}

