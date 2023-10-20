import { FC } from 'react';

const labelStyle = "block text-sm font-medium text-dl-400 m-0 mb-2";

interface InputProps {
    id: string;
    label: string;
    onFocus: (id: string) => void;
    onBlur: () => void;
    focused: string | null;
}

const getCurrentDate = (): string => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
};

export const DateInput: FC<InputProps> = ({ id, label, onFocus, onBlur, focused }) => {
    const inputStyle = `p-2 w-full rounded-md m-0 ${focused === id ? 'bg-stone-950' : 'bg-neutral-900 border border-dl-400 border-opacity-5'}`;

    return (
        <div>
            <label htmlFor={id} className={labelStyle}>
                {label}
            </label>
            <input
                type="date"
                name={id}
                id={id}
                className={inputStyle}
                defaultValue={getCurrentDate()} // Define o valor padrão como a data atual
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
            />
        </div>
    );
};
