import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { lightTheme, darkTheme, type ThemeMode } from "../theme";
import { type Theme } from "@mui/material";

interface UseThemeReturn {
    theme: Theme;
    mode: ThemeMode;
    toggleTheme: () => void;
    setMode: (mode: ThemeMode) => void;
    isDarkMode: boolean;
    gradientBackground: string;
}

export const useTheme = (): UseThemeReturn => {
    const [mode, setMode] = useLocalStorage<ThemeMode>("theme-mode", "light");

    const toggleTheme = () => {
        setMode((prevMode: ThemeMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const theme = useMemo(() => {
        return mode === "light" ? lightTheme : darkTheme;
    }, [mode]);

    const isDarkMode = mode === "dark";

    const gradientBackground = useMemo(() => {
        return `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;
    }, [theme]);

    return {
        theme,
        mode,
        toggleTheme,
        setMode,
        isDarkMode,
        gradientBackground,
    };
};

export const getThemeGradient = (theme: Theme) => {
    return `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;
};