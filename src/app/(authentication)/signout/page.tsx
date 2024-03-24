'use client'

import { signOut } from "next-auth/react";

export default function SignOutPage() {

    const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await signOut();
            if (response?.error) {
                console.error("Sign out failed:", response.error);
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            console.error("Error occurred during sign out:", error);
        }
    }

    return (
        <div>
            <h1>Signout</h1>
            <p>Are you sure you want to sign out?</p>
            <form onSubmit={handleSignOut}>
                <input type="hidden" name="csrfToken" value="csrf" />
                <button id="submitButton" type="submit">Sign out</button>
            </form>
        </div>
    );
}