import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"

export default function LoginButton() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <Button variant="contained" onClick={goToLogin}>
            Login
        </Button>
    );
}