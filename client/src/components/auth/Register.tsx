import React, { useState } from 'react';
import supabase from '../lib/supabase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })
        e.preventDefault();
        if (error) {
            console.error("Error encountered:", error);
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" id="email"></input>
                <input type="password" id="password"></input>
                <button type="submit">Register</button>
            </form>

        </div>
    );

}

export default Register;