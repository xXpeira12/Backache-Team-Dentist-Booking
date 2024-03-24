'use client'
import { signIn } from 'next-auth/react';

export default function signInPage() {

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await signIn('credentials', {
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
          redirect: false,
        });
        
        if(response?.ok) {
            window.location.href = '/';
        }
    }

    return(
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" />
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}