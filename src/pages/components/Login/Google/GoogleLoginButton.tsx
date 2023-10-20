import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useGoogleLogin from '../../hooks/get/Google/useGoogleLogin';

const buttonStyle = `
    rounded-full 
    bg-stone-950
    border-dl-400 
    border-opacity-10 
    hover:bg-stone-900 
    p-2 
    w-12 
    h-12 
    text-dl-400 
    flex 
    justify-center 
    items-center 
    mt-4 
    border
`;

const GoogleLoginButton: React.FC = () => {
    const handleGoogleLogin = useGoogleLogin();

    return (
        <div className="flex items-center justify-center">
            <button
                className={buttonStyle}
                type="button"
                onClick={handleGoogleLogin}
            >
                <FaGoogle />
            </button>
        </div>
    );
}

export default GoogleLoginButton;
