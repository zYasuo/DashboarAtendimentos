import { useState } from 'react';


const useLoginForm = (onSubmit: () => Promise<void>) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);


    const validateField = (
        value: string | undefined,
        errorMessage: string
    ): [boolean, string | null] => {
        return value ? [true, null] : [false, errorMessage];
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const [usernameValid, usernameErrorMsg] = validateField(username, 'O campo username é obrigatório');
        const [passwordValid, passwordErrorMsg] = validateField(password, 'O campo password é obrigatório');

        setUsernameError(usernameErrorMsg);
        setPasswordError(passwordErrorMsg);

        if (usernameValid && passwordValid) {
            await onSubmit();
        }
    };



    return {
        loading,
        handleSubmit,
        usernameError,
        passwordError
    };

};

export default useLoginForm;
