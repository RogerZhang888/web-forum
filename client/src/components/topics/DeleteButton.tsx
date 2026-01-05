import { Trash2 } from "lucide-react";
import { Button } from "@mui/material";

type DeleteButtonProps = {
    ownerId: string;
    currentUserId?: string;
    onDelete: () => void;
}

export default function DeleteButton({ ownerId, currentUserId, onDelete }: DeleteButtonProps) {
    if (!currentUserId || ownerId !== currentUserId ) {
        return null;
    }

    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}
            className="text-red-500 hover:text-red-700 transition"
            aria-label="Delete"
        >
            <Trash2 />
        </Button>
    )
}