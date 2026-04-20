import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box, GlobalStyles } from "@mui/material";
import { ThemeProvider as CustomThemeProvider, useThemeContext } from "./context/ThemeContext";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";

const globalStyles = {
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
};

const AppContent = () => {
  const { gradientBackground } = useThemeContext();

  return (
    <>
      <GlobalStyles styles={globalStyles} />
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: "100vh",
            background: gradientBackground,
            transition: "background 0.3s ease",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;