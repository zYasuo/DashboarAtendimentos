import React, { useState } from 'react';
import Loader from '../../Loader/LoaderLogin';
import LoginFields from '../PlataformaPrincipal/input/LoginFields';
import GoogleLoginButton from '../Google/GoogleLoginButton';
import GithubLoginButton from '../Github/GithubLoginButton';

interface LoginFormProps {
    onUsernameChange: (username: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: () => void;
}

// 
export const LoginForm: React.FC<LoginFormProps> = ({
    onUsernameChange,
    onPasswordChange,
    onSubmit: originalOnSubmit
}) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await originalOnSubmit();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    return (
        <div className="flex flex-col space-y-4 ">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col space-y-4">
                <LoginFields
                    onUsernameChange={onUsernameChange}
                    onPasswordChange={onPasswordChange}
                />
                <button
                    type="submit"
                    className="rounded-2xl bg-dl-700 hover:bg-dl-500 p-3 text-white flex justify-center items-center"
                >
                    {loading ? <Loader /> : "Login"}
                </button>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-neutral-900 text-gray-500">
                            OU
                        </span>
                    </div>
                </div>
                <div className="flex justify-around items-center">
                    <GoogleLoginButton />
                    <GithubLoginButton />
                </div>

            </form>

        </div>
    );
};


