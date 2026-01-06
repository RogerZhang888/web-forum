import { useEffect, useState } from "react";
import { Stack, Typography, CircularProgress, Button } from "@mui/material";
import Posts from "./Posts";
import NewPostButton from "./NewPostButton";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import type { Topic, Post } from "../lib/types";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import PageLayout from "../PageLayout";

export default function PostsPage() {
    const navigate = useNavigate();
    const { user, session } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [topic, setTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState(true);
    const { topic_id } = useParams<{ topic_id: string }>();
    const token = session?.access_token;

    const fetchTopic = async() => {
        const res = await fetch(`http://localhost:3000/topics/${topic_id}`);
        if (!res.ok) throw new Error("Failed to fetch topic");
        const data = await res.json();
        setTopic(data);
    }
    
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

    const deletePost = async (post_id: number) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/topics/${topic_id}/posts/${post_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Failed to delete post");
            }
            setPosts(prev => prev.filter(p => p.id !== post_id));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTopic();
        fetchPosts();
    }, [topic_id]);

    return (

            <PageLayout>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Typography variant="h4">
                        {topic ? topic.name : "Posts"}
                    </Typography>
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
                        <Button 
                            variant="outlined"
                            onClick={() => navigate(`/topics`)}
                        >
                            Back
                        </Button>
                    </Stack>
                </Stack>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Posts 
                        posts={posts} 
                        currentUserId={user?.id}
                        onDeletePost={deletePost}
                    />
                )}
            </PageLayout>

    );
}