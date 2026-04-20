import { Card, CardContent, CardActions, Typography, Box } from "@mui/material";
import { Article, Person } from "@mui/icons-material";
import { type PostCardProps } from "../types";


const PostCard = ({ post, onClick }: PostCardProps) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    return (
        <Card
            onClick={onClick}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: (theme) => theme.shadows[8],
                    "& .readMore": {
                        opacity: 1,
                    },
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Article color="primary" fontSize="small" />
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        <Person fontSize="inherit" />
                        User {post.userId || "?"}
                    </Typography>
                </Box>

                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "3.5rem",
                    }}
                >
                    {post.title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#666",
                        lineHeight: 1.6,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                >
                    {truncateText(post.body, 120)}
                </Typography>
            </CardContent>

            <CardActions>
                <Typography
                    className="readMore"
                    sx={{
                        color: "primary.main",
                        fontWeight: 500,
                        opacity: { xs: 1, sm: 0 }, // На мобильных всегда видно
                        transition: "opacity 0.3s ease",
                        ml: 1,
                        mb: 1,
                        fontSize: "0.9rem",
                    }}
                >
                    Читать далее →
                </Typography>
            </CardActions>
        </Card>
    );
};

export default PostCard;