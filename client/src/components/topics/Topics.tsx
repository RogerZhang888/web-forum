import Grid from '@mui/material/Grid';
import TopicComponent from "./TopicComponent";
import type { Topic } from "../lib/types";
import { useNavigate } from "react-router-dom";

type TopicsProps = {
    topics: Topic[];
}

export default function Topics({ topics }: TopicsProps) {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2}>
            {topics.map(topic => (
                <Grid key={topic.id}>
                    <TopicComponent 
                        name={topic.name}
                        description={topic.description}
                        onClick = {() => navigate(`/topics/${topic.id}`)}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

