import { createContext, useState, useEffect } from "react";
export const ThemeContext =createContext();
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("app-theme") || "light";
});
useEffect(() => {
    localStorage.setItem("app-theme", theme);
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}, [theme]);
//Функция переключения
const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
};
return (
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
);
}