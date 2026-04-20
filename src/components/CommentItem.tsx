import { Box, Typography, Divider, Paper } from "@mui/material";
import { Comment as CommentIcon, Email } from "@mui/icons-material";
import { type CommentItemProps } from "../types";


const CommentItem = ({ comment, isLast = false }: CommentItemProps) => {
    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 3 },
                    backgroundColor: "background.paper",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: "action.hover",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 1, sm: 0 },
                        mb: 1.5,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CommentIcon color="primary" fontSize="small" />
                        <Typography
                            variant="subtitle1"
                            component="strong"
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                fontSize: { xs: "0.95rem", sm: "1rem" },
                            }}
                        >
                            {comment.name}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Email fontSize="small" sx={{ color: "text.secondary", fontSize: "0.85rem" }} />
                        <Typography
                            variant="caption"
                            sx={{
                                color: "text.secondary",
                                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                            }}
                        >
                            {comment.email}
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        mt: 1,
                    }}
                >
                    {comment.body}
                </Typography>
            </Paper>

            {!isLast && <Divider sx={{ my: 1 }} />}
        </Box>
    );
};

export default CommentItem;