import {Card, CardActionArea, CardContent, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";

type PostComponentProps = {
  id: number;
  title: string;
  content?: string;
  onClick?: () => void;
}

export default function PostComponent({ id, title, content }: PostComponentProps) {
    const navigate = useNavigate();

    return (
        <Card onClick={() => navigate(`/posts/${id}`)}>
        <CardActionArea>
            <CardContent>
            <Typography variant="h6">{title}</Typography>
            {content && (
                <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,    
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
                >
                {content}
                </Typography>
            )}
            </CardContent>
        </CardActionArea>
        </Card>
    )
}