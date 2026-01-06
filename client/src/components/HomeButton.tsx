import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
    const navigate = useNavigate();
    return (
        <Button 
            variant="outlined"
            onClick={() => navigate("/topics")}
        >
            Home
        </Button>
    )
}