import {Card, CardActionArea, CardContent, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteButton from "./DeleteButton";

type TopicComponentProps = {
  id: number;
  createdBy: string;
  name: string;
  description: string;
  currentUserId?: string;
  onDelete: () => void;
}

export default function TopicComponent({ id, createdBy, name, description, currentUserId, onDelete }: TopicComponentProps) {
    const navigate = useNavigate();

    return (
      <Card
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/topics/${id}/posts`)}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        <DeleteButton 
              ownerId={createdBy}
              currentUserId={currentUserId}
              onDelete={onDelete} 
            />
        
      </Card>
    )
}