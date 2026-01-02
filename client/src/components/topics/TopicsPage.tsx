import { useEffect, useState } from "react";
import { Container, Stack, Typography, CircularProgress } from "@mui/material";
import Topics from "./Topics";
import NewTopicButton from "./NewTopicButton";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import type { Topic } from "../lib/types";
import { useAuth } from "../auth/AuthContext";

export default function TopicsPage() {
    const { user } = useAuth();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTopics = async () => {
        try {
            const res = await fetch("http://localhost:3000/topics");
            if (!res.ok) throw new Error("Failed to fetch topics");

            const data: Topic[] = await res.json();
            setTopics(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTopics();
    }, []);

    return (
        <Container maxWidth="lg">
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4">Topics</Typography>
                <Stack direction="row" spacing={2}>
                    <>
                        { user ? (
                            <LogoutButton />
                        ) : (
                            <LoginButton />
                        )
                        }
                    </>
                    <NewTopicButton onCreated={fetchTopics}></NewTopicButton>
                </Stack>
            </Stack>
            {loading ? (
                <CircularProgress />
            ) : (
                <Topics topics={topics} />
            )}
        </Container>
    );
}