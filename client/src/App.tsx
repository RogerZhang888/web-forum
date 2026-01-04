import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import TopicsPage from "./components/topics/TopicsPage";
import PostsPage from "./components/posts/PostsPage";
import PostPage from "./components/post/PostPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ErrorPage from "./components/ErrorPage";

export default function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary fallback={<ErrorPage />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/topics" replace />} />

                    <Route path="/topics" element={<TopicsPage />}/>
                    <Route path="/topics/:topic_id/posts" element={<PostsPage />} />
                    <Route path="/topics/:topic_id/posts/:post_id" element={<PostPage />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
        
    )

    

    
}

