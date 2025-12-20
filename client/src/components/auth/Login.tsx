import React, { useState } from 'react';
import supabase from '../lib/supabase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        e.preventDefault();
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
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
            <p></p>
        </div>
    );
}

export default Login