import {Paper, Typography, Stack} from "@mui/material";

type CommentComponentProps = {
    username: string;
    content: string;
}

export default function CommentComponent({ username, content } : CommentComponentProps) {
    return (
        <Paper variant="outlined">
            <Stack spacing={1}>
                <Typography variant="body2">{content}</Typography>
                <Typography variant="caption">{username}</Typography>
            </Stack>
        </Paper>
    )
}