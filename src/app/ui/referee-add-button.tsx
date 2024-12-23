'use client';

import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function RefereeAddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSession();
  const university_id = useParams().id;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  async function handleAddReferee(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObj = Object.fromEntries(formData.entries());

    const res = await fetch('/api/referees/add', {
      method: 'POST',
      body: JSON.stringify(dataObj),
      headers: { 'Content-Type': 'application/json' },
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
      <button
        onClick={openModal}
        className="flex items-center justify-center w-10 h-10 text-white bg-progress-bar-color rounded-full hover:bg-blue-700"
      >
        <PlusIcon className="w-4 h-4" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add a Referee</h2>
        <form onSubmit={handleAddReferee} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="position" className="text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="institution" className="text-sm font-medium text-gray-700 mb-1">
              Institution
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Pass along user + university */}
          <input type="hidden" name="user_id" value={data?.user?.id || ''} />
          <input type="hidden" name="university_id" value={university_id} />

          <button
            type="submit"
            className="bg-progress-bar-color hover:bg-blue-700 text-white text-sm font-medium py-2 rounded"
          >
            Add Referee
          </button>
        </form>
      </Modal>
    </div>
  );
}
