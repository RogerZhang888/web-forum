import {Card, CardActionArea, CardContent, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import DeleteButton from "../topics/DeleteButton";

type PostComponentProps = {
  id: number;
  topic_id: number;
  createdBy: string;
  title: string;
  content?: string;
  currentUserId?: string;
  onDelete: () => void;
}

export default function PostComponent({ id, topic_id, createdBy, title, content, currentUserId, onDelete }: PostComponentProps) {
    const navigate = useNavigate();
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
          <div className="absolute top-3 right-3">
            <DeleteButton
              ownerId={createdBy}
              currentUserId={currentUserId}
              onDelete={onDelete}
            />
          </div>
        </Card>
    )
}