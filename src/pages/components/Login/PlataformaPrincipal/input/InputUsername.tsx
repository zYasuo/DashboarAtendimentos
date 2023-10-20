import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

export interface InputUsernameProps {
    value: string;
    isFocused: boolean;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
}

const InputUsername: React.FC<InputUsernameProps> = ({ value, isFocused, onChange, onFocus, onBlur }) => (
    <div className={`flex border border-dl-300  border-opacity-10 rounded-sm p-2 ${isFocused ? 'bg-stone-950  border-dl-400' : 'bg-neutral-900'}`}>
        <FaEnvelope className={`self-center ml-2 mr-3 ${isFocused ? 'text-opacity-50 dark:text-blue-500' : ' text-dl-400'}`} />
        <input
            className="bg-transparent outline-none cursor-pointer w-full text-dl-400"
            type="text"
            placeholder="E-mail"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete="username"
        />
    </div>
);

export default InputUsername;
