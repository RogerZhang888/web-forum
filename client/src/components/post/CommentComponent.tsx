import {Paper, Typography, Stack} from "@mui/material";
import DeleteButton from "../topics/DeleteButton";

type CommentComponentProps = {
    createdBy: string;
    currentUserId?: string;
    username: string;
    content: string;
    onDelete: () => void;
}

export default function CommentComponent({ createdBy, currentUserId, username, content, onDelete } : CommentComponentProps) {
    return (
        <Paper 
            variant="outlined"
            sx={{
                p: 1,              
                position: "relative",
            }}
        >
            <Stack spacing={1}>
                <Typography variant="body2">{content}</Typography>
                <Typography variant="caption">{username}</Typography>
            </Stack>
            <div className="absolute top-3 right-3">
                <DeleteButton
                    ownerId={createdBy}
                    currentUserId={currentUserId}
                    onDelete={onDelete}
                />
            </div>
        </Paper>
    )
}