import React, { useState } from 'react';
import supabase from '../../supabase';

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            console.error("Error encountered:", error);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" id="email"></input>
                <input type="password" id="password"></input>
                <button type="submit">Login</button>
            </form>
            <p></p>
        </div>
    );
}

export default login