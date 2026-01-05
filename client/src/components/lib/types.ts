export type Topic = {
    id: number;
    created_by: string;
    name: string;
    description: string;
}

export type Post = {
    id: number;
    topic_id: number;
    topic: string;
    created_by: string;
    username: string;
    title: string;
    content: string;
}

export type Comment = {
    id: number;
    post_id: number;
    created_by: string;
    username: string;
    content: string;
}