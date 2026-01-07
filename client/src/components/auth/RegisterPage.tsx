import React, { useState } from 'react';
import supabase from '../lib/supabase';
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from '../PageLayout';
import HomeButton from '../HomeButton';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handleSubmit reached");
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })
        
        if (error) {
            console.error("Error encountered:", error);
            return;
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                user_id: data.user?.id,
                username,
                email,
            }),
        });

        const resData = await response.json();
        if (!response.ok) {
            console.error("backend error:", resData.error);
            return;
        }
        console.log("Profile creation response:", resData);

        navigate(from, { replace: true });
    }   

    return (
        <PageLayout>
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
                <p>Email</p>
                <input type="text" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p>Password</p>
                <input type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p>Username (make sure there are no spaces)</p>
                <input type="text" id="register-password" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br></br>
                <br></br>
                <button type="submit">Register</button>
                
            </form>
            <br></br>
            <HomeButton />
        </PageLayout>
    );

}
