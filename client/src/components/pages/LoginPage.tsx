import React, { useState } from 'react';
import supabase from '../lib/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        if (error) {
            console.error("Error encountered:", error);
            return (
                <div>
                    <p>Error encountered!</p>
                </div>
            )
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
            <p></p>
        </div>
    );
}
