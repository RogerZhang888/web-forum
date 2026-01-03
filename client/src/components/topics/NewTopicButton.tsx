import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Button,
    Dialog, 
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

type NewTopicButtonProps = {
    onCreated?: () => void;
}

export default function NewTopicButton({ onCreated }: NewTopicButtonProps) {
    const { user, session } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const token = session?.access_token;

    const handleCreate = async () => {
        if(!name.trim()) return; // do nothing if title field is empty
        
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/topics", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name}),
            });
            if (!res.ok) {
                throw new Error("Failed to create topic");
            }
            setName("");
            setOpen(false);
            onCreated?.();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleClick = () => {
        console.log("user:", user);
        if (!user) {
            navigate("/login", {
                state: { from: location }
            });
            return;
        }
        setOpen(true);
    }

    return (
        <>
            <Button variant="contained" onClick={handleClick}>
                New Topic
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth = "sm">
                <DialogTitle>Create New Topic</DialogTitle>

                <DialogContent>
                    <TextField 
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreate}
                        disabled={loading}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}