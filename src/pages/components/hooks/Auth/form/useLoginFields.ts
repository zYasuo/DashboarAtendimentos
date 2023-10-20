import { useState, useEffect } from 'react';
import { removeItem, setItem, getItem } from '../../../../utils/localStorage/Storage';

const useLoginFields = (
    onUsernameChange: (username: string) => void,
    onPasswordChange: (password: string) => void
) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isUsernameFocused, setUsernameFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(false);

    useEffect(() => {
        const savedUsername = getItem('savedUsername') || "";
        const savedPassword = getItem('savedPassword') || "";

        setUsername(savedUsername);
        setPassword(savedPassword);
        setRememberPassword(Boolean(savedUsername && savedPassword));
    }, []);



    const handleUsernameChange = (value: string) => {
        setUsername(value);
        if (!value) {
            setUsernameError("O campo E-mail é obrigatório.");
        } else {
            setUsernameError("");
        }
        onUsernameChange(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (!value) {
            setPasswordError("O campo Senha é obrigatório.");
        } else {
            setPasswordError("");
        }
        onPasswordChange(value);
    };


    const toggleShowPassword = () => setShowPassword(prev => !prev);

    const handleRememberPassword = () => {
        setRememberPassword(prevState => !prevState);
    }

    useEffect(() => {
        if (rememberPassword) {
            setItem('savedUsername', username);
            setItem('savedPassword', password);
        } else {
            removeItem('savedUsername');
            removeItem('savedPassword');
        }
    }, [rememberPassword, username, password]);

    return {
        username,
        password,
        usernameError,
        passwordError,
        isUsernameFocused,
        isPasswordFocused,
        showPassword,
        rememberPassword,
        handleUsernameChange,
        handlePasswordChange,
        setUsernameFocused,
        setPasswordFocused,
        toggleShowPassword,
        handleRememberPassword
    };
};

export default useLoginFields;
