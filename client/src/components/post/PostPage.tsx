import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Container, Stack, CircularProgress } from "@mui/material";
import PostDetailed from "./PostDetailed";
import CommentSection from "./CommentSection";
import NewCommentComponent from "./NewCommentComponent";
import LoginButton from "../auth/LoginButton";
import type { Comment, Post } from "../lib/types";
import { useParams, useNavigate } from "react-router-dom";

export default function PostPage() {
    const { user, session } = useAuth();
    const navigate = useNavigate();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const { post_id } = useParams<{ post_id: string }>();
    const [submitting, setSubmitting] = useState(false);
    const token = session?.access_token;

    const fetchPost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/posts/${post_id}`);
            if (!res.ok) throw new Error(`Failed to fetch post ${post_id}`);

            const data: Post = await res.json();
            setPost(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }
    
    const fetchComments = async () => {
        try {
            const res = await fetch(`http://localhost:3000/posts/${post_id}/comments`);
            if (!res.ok) throw new Error(`Failed to fetch comments for post ${post_id}`);
            const data: Comment[] = await res.json();
            setComments(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleCommentCreate = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        
        if (!newComment.trim()) return;

        setSubmitting(true);

        try {
            const res = await fetch(`http://localhost:3000/posts/${post_id}/comments`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({content: newComment}),
            });
            if (!res.ok) {
                throw new Error("Failed to create comment");
            }
            setNewComment("");
            await fetchComments();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        if (!post_id) return;

        Promise.all([fetchPost(), fetchComments()])
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [post_id]);

    if (loading) {
        return (
            <Container maxWidth="md">
                <CircularProgress />
            </Container>
        )
    }

    if (!post) return null;

    return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <PostDetailed
          title={post.title}
          content={post.content}
          author={post.author}
        />

        <CommentSection
          comments={comments}
          newComment={
            user ? (
              <NewCommentComponent
                content={newComment}
                onChange={setNewComment}
                onSubmit={handleCommentCreate}
                loading={submitting}
              />
            ) : (
              <LoginButton />
            )
          }
        />
      </Stack>
    </Container>
  );
}