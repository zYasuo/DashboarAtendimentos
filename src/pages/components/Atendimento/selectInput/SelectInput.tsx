import { FC } from 'react';

const labelStyle = "block text-sm font-medium text-dl-400 m-0 mb-2";

interface InputProps {
    id: string;
    label: string;
    options: any[];
    onFocus: (id: string) => void;
    onBlur: () => void;
    focused: string | null;
}

export const SelectInput: FC<InputProps> = ({ id, label, options, onFocus, onBlur, focused }) => {
    const inputStyle = `p-2 w-full rounded-md m-0 ${focused === id ? 'bg-stone-950' : 'bg-neutral-900 border border-dl-400 border-opacity-5'}`;

    return (
        <div>
            <label htmlFor={id} className={labelStyle}>
                {label}
            </label>
            <select
                id={id}
                name={id}
                className={inputStyle}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
            >
                {options && options.length > 0 ? (
                    options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.assunto || option.nome}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        Sem opções disponíveis
                    </option>
                )}
            </select>
        </div>
    );
};



