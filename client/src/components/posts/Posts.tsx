import { Typography, Grid } from '@mui/material';
import PostComponent from "./PostComponent";
import type { Post } from "../lib/types";

type PostsProps = {
    posts?: Post[] | null;
}

export default function Posts({ posts }: PostsProps) {
    if (!posts || posts.length === 0) {
    return <Typography>This topic has no posts yet.</Typography>;
  }

    return (
        <Grid container spacing={2}>
            {posts.map(post => (
                <Grid key={post.id}>
                <PostComponent
                    id = {post.id}
                    title={post.title}
                    content={post.content}
                />
                </Grid>
            ))}
        </Grid>
    )
}

