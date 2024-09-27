import { signIn } from "next-auth/react";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
export async function register(formData: FormData) {
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
        const res = await fetch('${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register', {
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

