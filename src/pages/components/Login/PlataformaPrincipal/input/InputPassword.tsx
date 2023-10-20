import React from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputPasswordProps {
    value: string;
    isFocused: boolean;
    showPassword: boolean;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    onToggleShowPassword: () => void;
}


const InputPassword: React.FC<InputPasswordProps> = ({ value, isFocused, showPassword, onChange, onFocus, onBlur, onToggleShowPassword }) => (
    <div className={`flex items-center border border-dl-300 border-opacity-10 rounded-sm p-2 ${isFocused ? 'bg-stone-950  border-dl-400' : 'bg-neutral-900'}`}>
        <FaLock className={`self-center ml-2 mr-3 ${isFocused ? 'text-opacity-50 dark:text-blue-500' : 'text-dl-400'}`} />
        <input
            className="bg-transparent outline-none cursor-pointer flex-grow text-dl-400"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete="current-password"
        />
        <button type="button" onClick={onToggleShowPassword} className="text-dl-400 focus:outline-none">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
    </div>
);

export default InputPassword;
