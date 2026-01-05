import { Typography, Grid } from '@mui/material';
import PostComponent from "./PostComponent";
import type { Post } from "../lib/types";

type PostsProps = {
    posts?: Post[] | null;
    currentUserId?: string;
    onDeletePost: (id: number) => void;
}

export default function Posts({ posts, currentUserId, onDeletePost }: PostsProps) {
    if (!posts || posts.length === 0) {
    return <Typography>This topic has no posts yet.</Typography>;
  }

    return (
        <Grid container spacing={2}>
            {posts.map(post => (
                <Grid key={post.id}>
                <PostComponent
                    id = {post.id}
                    topic_id = {post.topic_id}
                    createdBy= {post.created_by}
                    title={post.title}
                    content={post.content}
                    currentUserId={currentUserId}
                    onDelete={() => onDeletePost(post.id)}
                />
                </Grid>
            ))}
        </Grid>
    )
}

