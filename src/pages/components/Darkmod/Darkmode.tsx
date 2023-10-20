import { useState, useEffect } from 'react';

export function DarkModeToggle() {

    const [darkMode, setDarkMode] = useState(false);
    const [hasReadFromStorage, setHasReadFromStorage] = useState(false);


    useEffect(() => {
        if (!hasReadFromStorage) {
            const initialDarkMode = localStorage.getItem('dark-mode') === 'true';
            setDarkMode(initialDarkMode);
            setHasReadFromStorage(true);
        }
    }, [hasReadFromStorage]);

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



    return (
        <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
                <svg className="h-6 w-6 text-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                <svg className="h-6 w-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
}
