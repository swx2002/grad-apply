'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { handleLogin } from '../services/auth-service';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const handleSubmit = async (formData: FormData) => {
  //   const name = formData.get('name');
  //   const email = formData.get('email');
  //   const password = formData.get('password');
  //   setLoading(true);
  //   setError(null);
  //   const result = await signIn('credentials', {
  //     redirect: false,
  //     name,
  //     email,
  //     password,
  //   });
  //   setLoading(false);
  //   if (result?.error) {
  //     sessionStorage.setItem('isLoggedIn', 'false');
  //     setError(result.error);
  //   } else {
  //     window.location.href = '/dashboard';
  //   }
  // }

    return (
      <div>
        <button onClick={openModal} className="w-full py-3 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition-colors">
          Log in
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
                await handleLogin(formData);
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
                <LoginButton isLoading={isLoading} />
              </form>
          </Modal>
      </div>
    );
}

export function LoginButton({isLoading}: {isLoading: boolean}) {
  return (
      <button disabled = {isLoading} className="mt-4 w-full border bg-white-500 border-black text-black flex items-center justify-center rounded-md py-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
  )
}