'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import { useFormStatus } from 'react-dom';
export default function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    setLoading(true);
    setError(null);
    const result = await signIn('credentials', {
      redirect: false,
      name,
      email,
      password,
    });
    setLoading(false);
    if (result?.error) {
      sessionStorage.setItem('isLoggedIn', 'false');
      setError(result.error);
    } else {
      window.location.href = '/dashboard';
    }
  }

    return (

      <div>
        <button onClick={openModal} className="w-full px-4 py-2 text-center text-sm text-white bg-blue-500 hover:bg-blue-700">
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
              <form action={handleSubmit}>
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
                <LoginButton />
              </form>
          </Modal>
      </div>
    );
}

export function LoginButton() {
  const { pending } = useFormStatus();
  return (
      <button className="mt-4 w-full border border-gray-300 text-gray-700 flex items-center justify-center rounded-md py-2" aria-disabled={pending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
  )
}