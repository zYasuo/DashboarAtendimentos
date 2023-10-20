import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useData } from '../hooks/DataContext';
import { transformDataBySubject } from '../../utils/TransformData';

export function AssuntoChart() {
    const { atendimentos, loading, error } = useData();

    const transformedData = transformDataForRecharts(atendimentos);

    if (loading) return <p className="text-center">Carregando...</p>;
    if (error) return <p className="text-center">Erro ao carregar dados...</p>;

    return (
        <div className="w-full h-80 p-4 bg-opacity-50 shadow-xl rounded-lg bg-neutral-900 shadow-neutral-900/10">
            <h1 className="text-sm font-bold text-slate-300 mb-4">
                Relatório por Assunto
            </h1>
            <ResponsiveContainer height="90%">
                <LineChart data={transformedData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        formatter={(value, name) => [value, `Assunto: ${name}`]}
                        labelFormatter={(label) => `Nome: ${label}`}
                    />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <Line
                        name="Quantidade"
                        type="monotone"
                        dataKey="uv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function transformDataForRecharts(data: Array<{ assunto: string }>) {
    return transformDataBySubject(data);
}
