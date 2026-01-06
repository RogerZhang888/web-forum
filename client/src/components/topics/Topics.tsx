import Grid from '@mui/material/Grid';
import TopicComponent from "./TopicComponent";
import type { Topic } from "../lib/types";

type TopicsProps = {
    topics: Topic[];
    currentUserId?: string;
    onDeleteTopic: (id: number) => void;
}

export default function Topics({ topics, currentUserId, onDeleteTopic }: TopicsProps) {

    return (
        <Grid container spacing={2} justifyContent="center">
            {topics.map(topic => (
                <Grid key={topic.id}>
                    <TopicComponent 
                        id={topic.id}
                        createdBy={topic.created_by}
                        name={topic.name}
                        description={topic.description}
                        currentUserId={currentUserId}
                        onDelete={() => onDeleteTopic(topic.id)}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

