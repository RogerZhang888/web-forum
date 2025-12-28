import { Button } from '@mui/material';
import supabase from '../lib/supabase';

export default function LogoutButton () {
    const handleLogout = async () : Promise<void> => {
        const {error} = await supabase.auth.signOut();

        if (error) {
            console.error("Error encountered:", error);
        }
    }

    return (
        <Button variant="contained" onClick = {handleLogout}>
            Logout
        </Button>
    );
}
