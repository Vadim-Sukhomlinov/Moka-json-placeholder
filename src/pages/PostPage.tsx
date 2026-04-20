import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    CircularProgress,
    Alert,
    AlertTitle,
    Chip,
    Divider,
    Stack,
    Breadcrumbs,
    Link as MuiLink,
} from "@mui/material";
import {
    ArrowBack,
    Article,
    Person,
    Link as LinkIcon,
    Comment,
    Refresh,
} from "@mui/icons-material";
import { type Post } from "../types";
import { postCache } from "../utils/cache";

const API_URL = "https://json-placeholder.mock.beeceptor.com/posts";

const PostPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);

            try {
                const cacheKey = `post-${id}`;

                const cachedPost = postCache.get(cacheKey);
                if (cachedPost) {
                    console.log("Пост загружен из кэша:", cachedPost.id);
                    setPost(cachedPost);
                    setLoading(false);
                    return;
                }

                console.log("Загрузка поста с сервера...");
                const response = await fetch(`${API_URL}/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const postData = await response.json();

                postCache.set(cacheKey, postData);
                console.log("Пост сохранен в кэш:", postData.id);

                setPost(postData);
            } catch (error) {
                console.error("Ошибка загрузки поста:", error);
                setError(
                    "Не удалось загрузить пост. Пожалуйста, проверьте подключение к интернету."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleGoBack = () => {
        const savedPage = sessionStorage.getItem("postsPage");
        if (savedPage) {
            navigate(`/?page=${savedPage}`);
        } else {
            navigate("/");
        }
    };

    const handleRetry = () => {
        if (id) {
            postCache.delete(`post-${id}`);
        }
        window.location.reload();
    };

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
                    Загрузка поста...
                </Typography>
            </Box>
        );
    }

    if (error || !post) {
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
                    {error || "Пост не найден"}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 2 }}>
            {/* Хлебные крошки */}
            <Breadcrumbs sx={{ mb: 3, color: "white" }}>
                <MuiLink
                    color="inherit"
                    onClick={handleGoBack}
                    sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
                >
                    Главная
                </MuiLink>
                <Typography color="white">Пост #{post.id}</Typography>
            </Breadcrumbs>

            {/* Кнопка назад */}
            <Button
                startIcon={<ArrowBack />}
                onClick={handleGoBack}
                sx={{
                    mb: 3,
                    color: "white",
                    "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateX(-5px)",
                    },
                    transition: "all 0.3s ease",
                }}
            >
                Назад к постам
            </Button>

            {/* Пост */}
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 4 }}>
                <Stack spacing={3}>
                    {/* Информация о посте */}
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                        <Article color="primary" />
                        <Chip
                            icon={<Person />}
                            label={`Автор: User ${post.userId || "неизвестен"}`}
                            color="secondary"
                            variant="outlined"
                            size="small"
                        />
                        <Chip label={`ID: ${post.id}`} size="small" />
                    </Stack>

                    {/* Заголовок */}
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1.8rem", sm: "2rem" },
                            color: "#333",
                        }}
                    >
                        {post.title}
                    </Typography>

                    {/* Ссылка если есть */}
                    {post.link && (
                        <Button
                            component="a"
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            color="primary"
                            endIcon={<LinkIcon />}
                            sx={{
                                alignSelf: "flex-start",
                                "&:hover": {
                                    transform: "translateX(5px)",
                                },
                            }}
                        >
                            Читать оригинал →
                        </Button>
                    )}

                    <Divider />

                    {/* Контент */}
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            fontSize: "1.1rem",
                            color: "#666",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {post.body}
                    </Typography>

                    {/* Количество комментариев */}
                    {post.comment_count !== undefined && (
                        <Box
                            sx={{
                                mt: 2,
                                pt: 2,
                                borderTop: 1,
                                borderColor: "divider",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Comment color="primary" />
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                                Комментариев: {post.comment_count}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Paper>
        </Container>
    );
};

export default PostPage;