import {Card, CardContent, Typography, Box} from "@mui/material";

type PostProps = {
    author: string;
    title: string;
    content?: string;
    onClick?: () => void;
}

export default function PostDetailed({ author, title, content }: PostProps ) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="caption">{author}</Typography>
                <Box mt={2}>
                <Typography>{content}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}