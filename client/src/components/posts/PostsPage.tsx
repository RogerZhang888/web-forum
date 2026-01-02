import { useEffect, useState } from "react";

import {
    Container, 
    Stack,
    Typography, 
    CircularProgress
} from "@mui/material";

import Posts from "./Posts";
import NewPostButton from "./NewPostButton";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import type { Post } from "../lib/types";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function PostsPage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { topic_id } = useParams<{ topic_id: string }>();

    const fetchPosts = async () => {
        try {
            const res = await fetch(`http://localhost:3000/topics/${topic_id}/posts`);
            if (!res.ok) throw new Error(`Failed to fetch posts for ${topic_id}`);

            const data: Post[] = await res.json();
            setPosts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Container maxWidth="lg">
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4">Posts</Typography>
                <Stack direction="row" spacing={2}>
                    <>
                    { user ? (
                        <LogoutButton />
                    ) : (
                        <LoginButton />
                    )
                    }
                    </>
                    <NewPostButton onCreated={fetchPosts}></NewPostButton>
                </Stack>
            </Stack>
            {loading ? (
                <CircularProgress />
            ) : (
                <Posts posts={posts} />
            )}
        </Container>
    );
}