import {Card, CardActionArea, CardContent, Typography} from '@mui/material';

type TopicCardProps = {
  title: string;
  description?: string; //there's actually no description
}

export default function TopicComponent({ title, description }: TopicCardProps) {
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
}