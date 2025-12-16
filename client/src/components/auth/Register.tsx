import React, { useState } from 'react';
import supabase from '../../supabase';

const register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            console.error(error);
        }
    };

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

export default register;