// services/AuthenticationService.ts

export const authenticateUser = async (email: string, password: string) => {
    try {
        const response = await fetch('/api/Usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            return { token: data.token, userId: data.userId, nome: data.nome }; // Retorna o token, userId e nome
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return null;
    }
};
