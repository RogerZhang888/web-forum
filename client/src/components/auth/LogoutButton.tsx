import React, { useState } from 'react';
import supabase from '../../supabase';

const logoutButton = () => {
    const handleSubmit = async (e) => {
        const {error} = await supabase.auth.signOut();
        if (error) {
            console.error("Error encountered:", error);
        }
    }

    return (
        <button onClick = {handleSubmit}>
            Logout
        </button>
    );
}

export default logoutButton