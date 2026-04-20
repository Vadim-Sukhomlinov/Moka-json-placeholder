import React, { createContext, useContext, type ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useTheme } from "../hooks/useTheme";
import type { ThemeContextValue } from "../types";


const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { theme, toggleTheme, isDarkMode, gradientBackground } = useTheme();

    return (
        <ThemeContext.Provider value={{ toggleTheme, isDarkMode, gradientBackground }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within ThemeProvider");
    }
    return context;
};