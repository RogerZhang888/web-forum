import React, { useState } from 'react';
import supabase from '../lib/supabase';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PageLayout from '../PageLayout';
import HomeButton from '../HomeButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/topics";

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

        navigate(from, { replace: true });
    }

    return (
        
        <PageLayout>
            <h2>Login</h2>
            <p>Only logged-in users can create topics, posts and leave comments.</p>
            <form onSubmit = {handleSubmit}>
                <p>Email</p>
                <input type="text" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <br></br>
                <p>Password</p>
                <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br></br>
                <br></br>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account yet? </p>
            <Button variant="outlined" onClick = {() => navigate("/register")}>
                Register
            </Button>
            <br></br><br></br>
            <HomeButton />
        </PageLayout>
        
    );
}
