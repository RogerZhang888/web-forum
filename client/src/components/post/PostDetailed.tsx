import {Card, CardContent, Typography, Box} from "@mui/material";

type PostProps = {
    username: string;
    title: string;
    content?: string;
    onClick?: () => void;
}

export default function PostDetailed({ username, title, content }: PostProps ) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="caption">{username}</Typography>
                <Box mt={2}>
                <Typography>{content}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}