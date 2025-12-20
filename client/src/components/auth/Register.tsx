import React, { useState } from 'react';
import supabase from '../lib/supabase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handleSubmit reached");
        const {error} = await supabase.auth.signUp({
            email: email,
            password: password
        })
        
        if (error) {
            console.error("Error encountered:", error);
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>

        </div>
    );

}

export default Register;