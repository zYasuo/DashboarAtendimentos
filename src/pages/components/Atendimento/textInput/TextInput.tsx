import { FC } from 'react';

const labelStyle = "block text-sm font-medium text-dl-400 m-0 mb-2";

interface InputProps {
    id: string;
    label: string;
    placeholder?: string;
    marginTop?: string;
    value?: string;
    readonly?: boolean;
    onFocus: (id: string) => void;
    onBlur: () => void;
    focused: string | null;
}

export const TextInput: FC<InputProps> = ({ id, label, placeholder, marginTop, value, readonly, onFocus, onBlur, focused }) => {
    const inputStyle = `p-2 w-full rounded-md m-0 ${focused === id ? 'bg-stone-950' : 'bg-neutral-900 border border-dl-400 border-opacity-5'}`;

    return (
        <div className={marginTop || ''}>
            <label htmlFor={id} className={labelStyle}>
                {label}
            </label>
            <input
                type="text"
                name={id}
                id={id}
                className={inputStyle}
                placeholder={placeholder}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                {...(value !== undefined ? { value } : {})}
                readOnly={readonly}
            />
        </div>
    );
};

