"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoginForm } from './Form/LoginForm';
import useLoginActions from '../hooks/form/UseLoginActions';
import LoginLayout from './layout/LoginLayout';
import { setItem } from '../../utils/localStorage/Storage';


const Login = () => {
    const [token, setToken] = useState<string | null>(null);
    const {
        username,
        setUsername,
        password,
        setPassword,
        handleLogin: originalHandleLogin
    } = useLoginActions();

    const router = useRouter();

    const handleLogin = async () => {
        const result = await originalHandleLogin();
        if (result && result.token) {
            setToken(result.token);
            setItem('token', result.token);
            setItem('userId', result.userId.toString());
            setItem('userName', result.nome); // Aqui você salva o nome do usuário no localStorage

            router.push('/Dashboard');
        }
    };




    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            setToken(localToken);
            setTimeout(() => {
                router.push('/Dashboard');
            },);
        }
    }, [router, token]);


    return (
        <LoginLayout>
            <LoginForm
                onUsernameChange={setUsername}
                onPasswordChange={setPassword}
                onSubmit={handleLogin}
            />
        </LoginLayout>
    );
};

export default Login;
