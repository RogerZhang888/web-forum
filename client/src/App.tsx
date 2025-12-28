import "./App.css"
import "./index.css";
import { useState, useEffect } from "react";
import supabase from "./components/lib/supabase";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LogoutButton from "./components/auth/LogoutButton";
import type { Session } from "@supabase/supabase-js";

export default function App() {
    const [session, setSession] = useState<Session | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {


    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
    });
    
    

    // Listen for auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("Auth event:", event);
        console.log("Session: ", session);
        setSession(session);
    });

    return () => subscription.subscription.unsubscribe(); //???????
    }, []);


    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    // Show auth error
    if (authError) {
        console.log("authError: ", authError);
        return (
            <div>
                <h1>Authentication</h1>
                <p>✗ Authentication failed</p>
                <p>{authError}</p>
                <button
                    onClick={() => {
                        setAuthError(null);
                        window.history.replaceState({}, document.title, "/");
                    }}
                >
                    Return to login
                </button>
            </div>
        );
    }

    

    // If user is logged in, show welcome screen
    if (session) {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in as: {session.user.email}</p>
                <LogoutButton />
            </div>
        );
    }


    <BrowserRouter>
    
    </BrowserRouter>
}

