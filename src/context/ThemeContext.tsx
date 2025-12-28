import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Available theme options
type Theme = "dark" | "light" | "tan" | "cloud";

// Default theme for new users (tan matches warm aesthetic)
const DEFAULT_THEME: Theme = "tan";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme; // Allow overriding default theme
}

// Get initial theme from localStorage or use default
const getInitialTheme = (defaultTheme: Theme): Theme => {
  try {
    const saved = localStorage.getItem("blog-theme") as Theme;
    if (saved && ["dark", "light", "tan", "cloud"].includes(saved)) {
      return saved;
    }
  } catch {
    // localStorage not available
  }
  return defaultTheme;
};

// Theme color values for meta tag
const themeColors: Record<Theme, string> = {
  dark: "#111111",
  light: "#ffffff",
  tan: "#faf8f5",
  cloud: "#f5f5f5",
};

// Update meta theme-color tag for mobile browsers
const updateMetaThemeColor = (theme: Theme) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", themeColors[theme]);
  }
};

export function ThemeProvider({ children, defaultTheme = DEFAULT_THEME }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(defaultTheme));

  // Apply theme to DOM and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("blog-theme", theme);
    updateMetaThemeColor(theme);
  }, [theme]);

  // Set theme directly
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Cycle through themes: dark -> light -> tan -> cloud -> dark
  const toggleTheme = () => {
    const themes: Theme[] = ["dark", "light", "tan", "cloud"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeState(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
