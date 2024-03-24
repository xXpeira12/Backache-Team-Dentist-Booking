'use client'
import { useState } from 'react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
        role: 'user',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                window.location.href = '/signin';
            } else {
                // Handle registration failure
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Name" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="tel">Telephone</label>
                    <input 
                        type="tel" 
                        id="tel" 
                        name="tel" 
                        value={formData.tel} 
                        onChange={handleChange} 
                        placeholder="Telephone" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}