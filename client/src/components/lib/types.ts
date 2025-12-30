export type Topic = {
    id: number;
    name: string;
    description?: string;
}

export type Post = {
    id: number;
    topic_id: number;
    title: string;
    content?: string;
}

export type Comment = {
    id: number;
    post_id: number;
    content?: string;
}