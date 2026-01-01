import {Card, CardActionArea, CardContent, Typography} from '@mui/material';

type PostComponentProps = {
  title: string;
  content?: string;
  onClick?: () => void;
}

export default function PostComponent({ title, content }: PostComponentProps) {
    return (
        <Card>
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