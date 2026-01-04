import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
    Button,
    Dialog, 
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

type NewPostButtonProps = {
    onCreated?: () => void;
}

export default function NewPostButton({ onCreated }: NewPostButtonProps) {
    const { user, session } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const token = session?.access_token;
    const { topic_id } = useParams<{ topic_id: string }>();

    const handleCreate = async () => {
        if(!title.trim() || !content.trim()) return; // do nothing if title or content field is empty
        
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3000/topics/${topic_id}/posts`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, content}),
            });
            if (!res.ok) {
                throw new Error("Failed to create post");
            }
            setTitle("");
            setContent("");
            setOpen(false);
            onCreated?.();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleClick = () => {
        if (!user) {
            navigate("/login", {
                state: {from: location}
            });
            return;
        }
        setOpen(true);
    }

    return (
        <>
            <Button variant="contained" onClick={handleClick}>
                New Post
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth = "sm">
                <DialogTitle>Create New Post</DialogTitle>

                <DialogContent>
                    <TextField 
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        label="Content"
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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