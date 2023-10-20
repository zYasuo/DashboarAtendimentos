// hooks/useDarkMode.ts
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const initialDarkMode = localStorage.getItem('dark-mode') === 'true';
        setDarkMode(initialDarkMode);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            document.body.classList.remove('bg-gray-100');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('bg-gray-100');
        }

        localStorage.setItem('dark-mode', darkMode.toString());
    }, [darkMode]);

    return [darkMode, setDarkMode] as const;
};
