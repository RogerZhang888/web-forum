import { useState } from "react";

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
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if(!name.trim()) return; // do nothing if title field is empty
        
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/topics", {
                method: "POST",
                headers: {
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

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
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