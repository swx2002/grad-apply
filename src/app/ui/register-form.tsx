'use client';

import { useFormStatus } from 'react-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { register } from '@/app/lib/actions';
import { useState } from 'react';
import Modal from 'react-modal';
export default function RegisterForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleRegister = async (formData: FormData) => {
        const res = await register(formData);
        if (res.error) {
            alert(res.error);
        } else {
            alert(res.message);
            closeModal();
            window.location.href = '/dashboard';
        }
    }
    return (
        <div>
           <button onClick={openModal} className="w-full px-4 py-2 text-center text-sm text-white bg-blue-500 hover:bg-blue-700">
             Register
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
              <form action={handleRegister}>
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
                <RegisterButton />
              </form>
          </Modal>
        </div>
        // <form action={handleRegister}>
        //     <div>
        //         <label htmlFor="name">name</label>
        //         <input type="text" id="name" name="name" required className="text-black" />
        //     </div>
        //     <div>
        //         <label htmlFor="email">Email</label>
        //         <input type="email" id="email" name="email" required className="text-black" />
        //     </div>
        //     <div>
        //         <label htmlFor="password">Password</label>
        //         <input className="text-black" type="password" id="password" name="password" required />
        //     </div>
        //     <RegisterButton />
        // </form>
    );
}

export function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <button className="mt-4 w-full border border-gray-300 text-gray-700 flex items-center justify-center rounded-md py-2" aria-disabled={pending}>
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
    )
}
