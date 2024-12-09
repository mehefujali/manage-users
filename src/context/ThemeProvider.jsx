import { createContext, useState } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext()
// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
      const [theme, setTheme] = useState('light')
      return (
            <ThemeContext.Provider value={{ theme, setTheme }}>
                  {children}
            </ThemeContext.Provider>
      );
};

export default ThemeProvider;