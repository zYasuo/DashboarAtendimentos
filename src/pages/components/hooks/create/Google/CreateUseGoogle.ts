// hooks/CreateUseGoogle.ts

const CreateUseGoogle = () => {
    const createUser = async (user: any) => {
        const response = await fetch('/api/UsuarioGoogle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to create user in database');
        }

        return await response.json();
    };

    return createUser;
};

export default CreateUseGoogle;
