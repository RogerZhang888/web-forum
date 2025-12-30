import Grid from '@mui/material/Grid';
import PostComponent from "./PostComponent";
import type { Post } from "../lib/types";
import { useNavigate } from "react-router-dom";

type PostsProps = {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2}>
            {posts.map(post => (
                <Grid key={post.id}>
                <PostComponent
                    title={post.title}
                    content={post.content}
                    onClick={() =>
                    navigate(`/topics/${post.topic_id}/posts/${post.id}`)
                    }
                />
                </Grid>
            ))}
        </Grid>
    )
}

