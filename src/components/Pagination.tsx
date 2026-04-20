import { Pagination as MuiPagination, Stack, Box } from "@mui/material";
import type { PaginationProps } from "../types";



const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: { xs: 0.5, sm: 1 },
                mt: { xs: 4, sm: 12 },
                mb: 2,
            }}
        >
            <Stack spacing={2}>
                <MuiPagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => onPageChange(page)}
                    color="primary"
                    showFirstButton
                    showLastButton
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            minWidth: { xs: "35px", sm: "40px" },
                            padding: { xs: "6px 8px", sm: "8px 12px" },
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                                transform: "translateY(-2px)",
                            },
                            "&.Mui-disabled": {
                                opacity: 0.5,
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "white",
                                color: "#667eea",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "white",
                                },
                            },
                        },
                    }}
                />
            </Stack>
        </Box>
    );
};

export default Pagination;