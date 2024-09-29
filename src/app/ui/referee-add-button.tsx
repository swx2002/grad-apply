'use client';

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Modal from 'react-modal';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { RefereeInfo } from '../lib/definitions';

export default function RefereeAddButton() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const session = useSession();
    const user_id = session.data?.user?.id;
    // get university_id from url
    const university_id = useParams().id;
    async function handleAddReferee(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        const res = await fetch('/api/referees/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            alert('Referee added successfully');
            closeModal();
            window.location.reload();
        } else {
            alert('Failed to add referee');
        }
    }
    return (
        <div>
            <button onClick={openModal} className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full hover:bg-blue-700">
                <PlusIcon className="w-4 h-4" />
            </button>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Add Referee">
                <form onSubmit={handleAddReferee}>
                    <button onClick={closeModal}>
                        <XMarkIcon className="w-4 h-4 text-red-500" />
                    </button>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="position">Position</label>
                        <input type="text" id="position" name="position" required />
                    </div>
                    <div>
                        <label htmlFor="institution">Institution</label>
                        <input type="text" id="institution" name="institution" required />
                    </div>
                    <input type="hidden" id="user_id" name="user_id" value={user_id} />
                    <input type="hidden" id="university_id" name="university_id" value={university_id} />
                    <button type="submit" className="w-full px-4 py-2 text-center text-sm text-white bg-blue-500 hover:bg-blue-700">Add Referee</button>
                </form>
            </Modal>
        </div>
                
    )
}