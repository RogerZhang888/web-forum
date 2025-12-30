import {Card, CardActionArea, CardContent, Typography} from '@mui/material';

type TopicComponentProps = {
  name: string;
  description?: string; //there's actually no description
  onClick?: () => void;
}

export default function TopicComponent({ name, description }: TopicComponentProps) {
    return (
      <Card>
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