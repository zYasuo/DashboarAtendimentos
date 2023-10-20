import { useState } from 'react';
import { authenticateUser } from '../../../services/Firebase/Google/AuthenticationService';

type AuthenticationResult = {
    token: string;
    userId: number;
    nome: string;
};



const useLoginActions = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (): Promise<AuthenticationResult | null> => {
        return await authenticateUser(username, password);
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        handleLogin
    };
};

export default useLoginActions;
