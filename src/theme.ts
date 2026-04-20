import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#667eea",
            light: "#8296f0",
            dark: "#4c6ef5",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#764ba2",
            light: "#9b6bc4",
            dark: "#5a3380",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#333333",
            secondary: "#666666",
        },
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
        ].join(","),
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: "100%",
                    overflowY: "auto",
                },
                body: {
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    overflowY: "auto",
                },
                "#root": {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                },
                "*": {
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box",
                },
                "::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                },
                "::-webkit-scrollbar-track": {
                    background: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                },
                "::-webkit-scrollbar-thumb": {
                    background: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "4px",
                    "&:hover": {
                        background: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#667eea",
            light: "#8296f0",
            dark: "#4c6ef5",
        },
        secondary: {
            main: "#764ba2",
            light: "#9b6bc4",
            dark: "#5a3380",
        },
        background: {
            default: "#121212",
            paper: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0b0b0",
        },
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
        ].join(","),
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: "100%",
                    overflowY: "auto",
                },
                body: {
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    overflowY: "auto",
                },
                "#root": {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                },
                "*": {
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box",
                },
                "::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                },
                "::-webkit-scrollbar-track": {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                },
                "::-webkit-scrollbar-thumb": {
                    background: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "4px",
                    "&:hover": {
                        background: "rgba(255, 255, 255, 0.5)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                },
            },
        },
    },
});

export type ThemeMode = "light" | "dark";