import {Stack, Typography} from '@mui/material';
import CommentComponent from "./CommentComponent";
import type { Comment } from "../lib/types";

type CommentsProps = {
    comments: Comment[];
    newComment?: React.ReactNode;
}

export default function CommentSection({ comments, newComment }: CommentsProps) {
    return (
        <Stack>
            <Typography variant="h6">Comments</Typography>
            {comments.map(c => (
                <CommentComponent key={c.id} content={c.content} author={c.author}/>
            ))}
            {newComment}
        </Stack>
    )
}

