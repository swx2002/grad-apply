'use client'
import { signIn, signOut } from 'next-auth/react';
import { z } from "zod";

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

async function register(formData: FormData) {
    const parsedResult = registerSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });
    
      if (!parsedResult.success) {
        return {error: 'invalid input'}
      }
      const {name, email, password} = parsedResult.data;
      try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name,email, password}),
        });
        if (res.ok) {
            return {message: 'User added successfully'}
        } else {
            const data = await res.json();
            return {error: data.error || 'User registration failed'}
        }
      } catch (error) {
        return {error: 'Something went wrong'}
      }
}

export async function handleLogin(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const result = await signIn('credentials', {
      redirect: false,
      name,
      email,
      password,
    });
    if (result?.error) {
      sessionStorage.setItem('isLoggedIn', 'false');
    } else {
      window.location.href = '/dashboard';
    }
  }

export async function handleLogout() {
    await signOut({redirect: false});
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userName');
    window.location.href = '/';
  }

export async function handleRegister(formData: FormData) {
  const res = await register(formData);
  if (res.error) {
      alert(res.error);
  } else {
      alert(res.message);
      window.location.href = '/';
  }
}