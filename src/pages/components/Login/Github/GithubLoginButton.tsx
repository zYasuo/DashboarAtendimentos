import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { handleGithubLogin } from '../../../services/Firebase/Github/AuthenticationService'; // Atualize com o caminho correto para o seu arquivo GithubAuth.ts

const buttonStyle = `
    rounded-full 
    bg-neutral-950
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

const GithubLoginButton: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <button
                className={buttonStyle}
                type="button"
                onClick={async () => {
                    const userDetails = await handleGithubLogin();
                    if (userDetails) {
                        console.log("Logged in with GitHub:", userDetails);
                    }
                }}
            >
                <FaGithub />
            </button>
        </div>
    );
}

export default GithubLoginButton;
