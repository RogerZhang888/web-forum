import { Paper, Stack, TextField, Button } from "@mui/material";

type NewCommentComponentProps = {
    content: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    loading: boolean;
}

export default function NewCommentComponent({
    content,
    onChange,
    onSubmit,
    loading,
}: NewCommentComponentProps) {
    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing ={2}>
                <TextField 
                    multiline
                    minRows={3}
                    placeholder="Leave your thoughts"
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                />

                <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={loading || !content.trim()}
                >
                    Post comment    
                </Button>
            </Stack>
        </Paper>

    )
}