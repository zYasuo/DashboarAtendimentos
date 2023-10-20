import { useState } from 'react';
import { setItem } from '../../..//utils/localStorage/Storage';
import useLoginActions from './form/useLoginActions';

const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {
        handleLogin: originalHandleLogin
    } = useLoginActions();

    const authenticate = async () => {
        const result = await originalHandleLogin();
        if (result && result.token) {
            setToken(result.token);
            setItem('token', result.token);
            setItem('userId', result.userId.toString());
            setItem('userName', result.nome); // Aqui você salva o nome do usuário no localStorage
            return true;
        }
        return false;
    };

    return {
        token,
        setToken,
        authenticate,
        username,
        setUsername,
        password,
        setPassword
    };
};

export default useAuth;
