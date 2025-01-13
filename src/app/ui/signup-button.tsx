'use client';

import { useFormStatus } from 'react-dom';
import { handleRegister } from '../services/auth-service';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Modal from 'react-modal';
export default function RegisterForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    return (
        <div>
           <button onClick={openModal} className="w-full px-4 py-2 text-center rounded-md text-sm text-white bg-black hover:bg-white hover:text-black hover:border-black hover:border">
             Sign up
           </button>
           <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Login Form" style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },}}>
              <form action={async (formData: FormData) => {
                setIsLoading(true);
                await handleRegister(formData);
              }}>
              <div>
                 <label htmlFor="name">name</label>
                 <input type="text" id="name" name="name" required className="text-black" />
             </div>
             <div>
                 <label htmlFor="email">Email</label>
                 <input type="email" id="email" name="email" required className="text-black" />
             </div>
             <div>
                 <label htmlFor="password">Password</label>
                 <input className="text-black" type="password" id="password" name="password" required />
             </div>
                <RegisterButton isLoading={isLoading} />
              </form>
          </Modal>
        </div>
    );
}

export function RegisterButton({isLoading}: {isLoading: boolean}) {
    return (
        <button className="mt-4 w-full border border-gray-300 text-gray-700 flex items-center justify-center rounded-md py-2">
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
    )
}
