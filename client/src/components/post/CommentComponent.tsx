import {Paper, Typography, Stack} from "@mui/material";

type CommentComponentProps = {
    author: string;
    content: string;
}

export default function CommentComponent({ author, content } : CommentComponentProps) {
    return (
        <Paper variant="outlined">
            <Stack spacing={1}>
                <Typography variant="body2">{content}</Typography>
                <Typography variant="caption">{author}</Typography>
            </Stack>
        </Paper>
    )
}