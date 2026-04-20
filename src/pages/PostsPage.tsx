import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Grid,
    Alert,
    AlertTitle,
    Button,
    CircularProgress,
} from "@mui/material";
import { Refresh, Article } from "@mui/icons-material";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { type Post } from "../types";
import { postsCache } from "../utils/cache";

const POSTS_PER_PAGE = 4;
const API_URL = "https://json-placeholder.mock.beeceptor.com/posts";

const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentPage = parseInt(searchParams.get("page") || "1");

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);

            try {
                const cachedPosts = postsCache.get("all-posts");
                if (cachedPosts) {
                    console.log("Загружено из кэша:", cachedPosts.length, "постов");
                    setPosts(cachedPosts);
                    setLoading(false);
                    return;
                }

                console.log("Загрузка с сервера...");
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const allPosts: Post[] = await response.json();

                postsCache.set("all-posts", allPosts);
                console.log("Сохранено в кэш:", allPosts.length, "постов");

                setPosts(allPosts);
            } catch (error) {
                console.error("Ошибка загрузки постов:", error);
                setError("Не удалось загрузить посты. Пожалуйста, проверьте подключение к интернету.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePostClick = (postId: number) => {
        sessionStorage.setItem("postsPage", currentPage.toString());
        navigate(`/post/${postId}`);
    };

    const handleRetry = () => {
        postsCache.delete("all-posts");
        window.location.reload();
    };

    // Состояние загрузки
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                    gap: 3,
                }}
            >
                <CircularProgress size={60} thickness={3} />
                <Typography variant="h6" color="white">
                    Загрузка постов...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Alert
                    severity="error"
                    icon={<span style={{ fontSize: "2rem" }}>⚠️</span>}
                    sx={{ mt: 4 }}
                    action={
                        <Button color="inherit" size="small" onClick={handleRetry} startIcon={<Refresh />}>
                            Повторить
                        </Button>
                    }
                >
                    <AlertTitle>Ошибка загрузки</AlertTitle>
                    {error}
                </Alert>
            </Container>
        );
    }

    const placeholdersCount = Math.max(0, POSTS_PER_PAGE - currentPosts.length);
    const placeholders = Array(placeholdersCount).fill(null);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    textAlign: "center",
                    color: "white",
                    py: 4,
                    px: 2,
                    bgcolor: "rgba(0, 0, 0, 0.1)",
                    mb: 4,
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1.8rem", sm: "2.5rem" },
                        mb: 1,
                    }}
                >
                    Блог
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        opacity: 0.9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <Article fontSize="small" />
                    Всего постов: {totalPosts}
                </Typography>
            </Box>

            {/* Контент с постами */}
            <Container maxWidth="lg" sx={{ flex: 1, pb: 4 }}>
                <Grid container spacing={3}>
                    {currentPosts.map((post) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                            <PostCard post={post} onClick={() => handlePostClick(post.id)} />
                        </Grid>
                    ))}

                    {/* Плейсхолдеры для сохранения высоты сетки */}
                    {placeholders.map((_, index) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4 }}
                            key={`placeholder-${index}`}
                            sx={{
                                visibility: "hidden",
                                pointerEvents: "none",
                            }}
                        >
                            <Box sx={{ height: "100%", minHeight: 280 }} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Пагинация */}
            {totalPages > 1 && (
                <Box
                    sx={{
                        py: 3,
                        px: 2,
                        bgcolor: "rgba(0, 0, 0, 0.1)",
                        mt: "auto",
                    }}
                >
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Box>
            )}
        </Box>
    );
};

export default PostsPage;