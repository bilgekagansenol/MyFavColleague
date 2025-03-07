import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Tema renkleri
export const lightTheme = {
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#6C757D',
  primary: '#003366',
  secondary: '#FFA500',
  border: '#E9ECEF',
  error: '#FF3B30',
  success: '#28A745',
  headerBackground: ['#003366', '#1F2937'],
};

export const darkTheme = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  primary: '#4D82BC', // Daha açık bir mavi
  secondary: '#FFB733', // Daha açık bir turuncu
  border: '#2C2C2C',
  error: '#FF6B6B',
  success: '#4CAF50',
  headerBackground: ['#000000', '#121212'],
};

// Tema context'i
const ThemeContext = createContext({
  isDarkMode: false,
  theme: lightTheme,
  toggleTheme: () => {},
});

// Tema provider'ı
export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cihaz temasını kontrol et
  useEffect(() => {
    // Başlangıçta cihaz temasını kullan (opsiyonel)
    // setIsDarkMode(deviceColorScheme === 'dark');
  }, [deviceColorScheme]);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Mevcut temayı belirle
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Tema hook'u
export const useTheme = () => useContext(ThemeContext); 