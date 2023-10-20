
export const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const getItem = (key: string): string | null => {
    if (typeof window !== 'undefined') { // Verifica se está no ambiente do cliente
        return localStorage.getItem(key);
    }
    return null;
};


export const removeItem = (key: string) => {
    localStorage.removeItem(key);
}
