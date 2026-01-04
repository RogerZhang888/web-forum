import {Card, CardActionArea, CardContent, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";

type PostComponentProps = {
  id: number;
  topic_id: number;
  title: string;
  content?: string;
  onClick?: () => void;
}

export default function PostComponent({ id, topic_id, title, content }: PostComponentProps) {
    const navigate = useNavigate();
    console.log(topic_id);
    return (
        <Card onClick={() => navigate(`/topics/${topic_id}/posts/${id}`)}>
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