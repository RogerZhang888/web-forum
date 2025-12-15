import './App.css'
import "./index.css";
import { useState, useEffect } from "react";
import supabase from "./supabase";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [session, setSession] = useState(null);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });

    // Listen for auth changes
    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
    });

    return () => subscription.unsubscribe();
    }, []);

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

    // Show auth success (briefly before session loads)
    if (authSuccess && !session) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>✓ Authentication successful!</p>
                <p>Loading your account...</p>
            </div>
        );
    }

    // If user is logged in, show welcome screen
    if (session) {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in as: {session.user.email}</p>
                <button onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        );
    }

    // Show login form
    return (
        <div>
            <h1>Supabase + React</h1>
            <p>Register</p>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button disabled={loading}>
                    {loading ? <span>Loading</span> : <span>Send magic link</span>}
                </button>
            </form>
        </div>
    );
}

