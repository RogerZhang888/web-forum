import { useEffect, useState } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material";
import Topics from "./Topics";
import NewTopicButton from "./NewTopicButton";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import PageLayout from "../PageLayout";
import type { Topic } from "../lib/types";
import { useAuth } from "../auth/AuthContext";

export default function TopicsPage() {
    const { user, session } = useAuth();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const token = session?.access_token;
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    const fetchTopics = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/topics`);
            if (!res.ok) throw new Error("Failed to fetch topics");

            const data: Topic[] = await res.json();
            setTopics(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    const deleteTopic = async (topic_id: number) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/topics/${topic_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Failed to delete topic");
            }
            setTopics(prev => prev.filter(t => t.id !== topic_id));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTopics();
    }, []);

    return (

        <PageLayout>
            <Stack
                direction="row"
                justifyContent="center"
                mb={3}
            >
                <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "left" }}>Topics</Typography>
                <Stack direction="row" spacing={2}>
                    { user ? <LogoutButton /> : <LoginButton /> }
                    <NewTopicButton onCreated={fetchTopics}></NewTopicButton>
                </Stack>
            </Stack>
            {loading ? (
                <CircularProgress />
            ) : (
                <Topics 
                    topics={topics} 
                    currentUserId={user?.id}
                    onDeleteTopic={deleteTopic}
                />
            )}
        </PageLayout>

    );
}