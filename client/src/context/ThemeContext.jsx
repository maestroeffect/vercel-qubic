import { useEffect, createContext, useContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    // Toggle dark mode and save to localStorage
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        // Save the initial state to localStorage on mount
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);


    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            background: {
                default: darkMode ? '#121212' : '#fff',
                paper: darkMode ? '#1e1e1e' : '#fff',
            },
            text: {
                primary: darkMode ? '#fff' : '#000',
                secondary: darkMode ? '#b0b0b0' : '#555',
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
