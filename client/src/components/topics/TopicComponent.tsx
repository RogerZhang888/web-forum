import {Card, CardActionArea, CardContent, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type TopicComponentProps = {
  id: number;
  name: string;
  description?: string; //there's actually no description
  onClick?: () => void;
}

export default function TopicComponent({ id, name, description }: TopicComponentProps) {
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
      </Card>
    )
}