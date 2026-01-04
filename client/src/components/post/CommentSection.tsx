import {Stack, Typography} from '@mui/material';
import CommentComponent from "./CommentComponent";
import type { Comment } from "../lib/types";

type CommentsProps = {
    comments: Comment[];
    newComment?: React.ReactNode;
}

export default function CommentSection({ comments, newComment }: CommentsProps) {
    if (!comments || comments.length === 0) {
    return (
        <Stack>
            <Typography>This post has no comments yet.</Typography>
            {newComment}
        </Stack>
    )
  }
    
    return (
        <Stack>
            <Typography variant="h6">Comments</Typography>
            {comments.map(c => (
                <CommentComponent key={c.id} content={c.content} username={c.username}/>
            ))}
            {newComment}
        </Stack>
    )
}

