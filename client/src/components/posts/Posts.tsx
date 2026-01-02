import Grid from '@mui/material/Grid';
import PostComponent from "./PostComponent";
import type { Post } from "../lib/types";

type PostsProps = {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {

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

