import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import { removeItem, setItem, getItem } from '../../../../utils/localStorage/Storage';

import InputUsername from './InputUsername';
import InputPassword from './InputPassword';

interface LoginFieldsProps {
    onUsernameChange: (username: string) => void;
    onPasswordChange: (password: string) => void;
}

const LoginFields: React.FC<LoginFieldsProps> = ({ onUsernameChange, onPasswordChange }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        onUsernameChange(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
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

    return (
        <div className="flex flex-col space-y-4 mt-8">
            <InputUsername
                value={username}
                isFocused={isUsernameFocused}
                onChange={handleUsernameChange}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
            />
            <InputPassword
                value={password}
                isFocused={isPasswordFocused}
                showPassword={showPassword}
                onChange={handlePasswordChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onToggleShowPassword={toggleShowPassword}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <button type="button" onClick={handleRememberPassword} className="focus:outline-none">
                        {rememberPassword ? <FaCheckCircle className="text-dl-700" /> : <FaCircle className="text-opacity-20 text-gray-500" />}
                    </button>
                    <label className="cursor-pointer text-dl-400" onClick={handleRememberPassword}>Lembrar Senha</label>
                </div>
                <a href="#" className="text-dl-400 font-semibold text-md">Esqueci a Senha</a>
            </div>
        </div>
    );
}

export default LoginFields;
