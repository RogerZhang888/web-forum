import React, { useState } from 'react';

import supabase from '../lib/supabase';

const LogoutButton = () => {
    const handleLogout = async () : Promise<void> => {
        const {error} = await supabase.auth.signOut();

        if (error) {
            console.error("Error encountered:", error);
        }
    }

    return (
        <button onClick = {handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton