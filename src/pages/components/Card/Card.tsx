// components/Card.tsx
import { ReactNode } from 'react';

type CardProps = {
    icon: ReactNode;
    description: string;
    count: number;
    extraClassName?: string;
};

export function Card({ icon, description, count, extraClassName }: CardProps) {
    const isSpecialStyle = extraClassName === "bg-dl-700";

    // Define o background padrão ou especial baseado em isSpecialStyle
    const cardBackground = isSpecialStyle ? 'bg-dl-700' : 'bg-neutral-900 bg-opacity-50';

    return (
        <div className={`p-4 rounded-lg flex flex-col justify-between h-32 ${cardBackground} shadow-neutral-900/10 dark:border border-gray-800 border-opacity-50`}>
            <div className={`text-xl w-12 h-12 mb-2 ${isSpecialStyle ? 'bg-dl-400 bg-opacity-10 text-white' : 'bg-dl-400 bg-opacity-10 text-slate-300'} p-3 rounded-full flex items-center justify-center`}>
                {icon}
            </div>
            <div className="flex justify-between items-end">
                <p className={`text-md font-bold ${isSpecialStyle ? 'text-white' : 'text-slate-300'}`}>{description}</p>
                <span className={`text-sm font-bold px-4 py-2 rounded-full ${isSpecialStyle ? 'bg-dl-400 bg-opacity-10 text-slate-100' : 'bg-blue-50 text-slate-300 bg-opacity-20'}`}>{count}</span>
            </div>
        </div>
    );
}


