import Grid from '@mui/material/Grid';
import TopicComponent from "./TopicComponent";
import type { Topic } from "../lib/types";

type TopicsProps = {
    topics: Topic[];
}

export default function Topics({ topics }: TopicsProps) {

    return (
        <Grid container spacing={2}>
            {topics.map(topic => (
                <Grid key={topic.id}>
                    <TopicComponent 
                        id={topic.id}
                        name={topic.name}
                        description={topic.description}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

