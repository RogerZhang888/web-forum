import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
    ownerId: number;
    currentUserId: number | null;
    onDelete: () => void;
    size
}