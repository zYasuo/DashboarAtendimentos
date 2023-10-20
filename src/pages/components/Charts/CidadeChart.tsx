import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../hooks/DataContext';
import { transformDataByFilial } from '../../utils/TransformData';

export function CidadeChart() {
    const { atendimentos, loading, error } = useData();
    const [transformedData, setTransformedData] = useState<{ fill: string; name: string; uv: number }[]>([]);

    useEffect(() => {
        const COLORS = ['#6AD2FF', '#413EA0', '#05CD99', '#FF7300'];
        setTransformedData(transformDataForRecharts(transformDataByFilial(atendimentos), COLORS));
    }, [atendimentos]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar dados...</p>;

    return (
        <div className="w-full h-80 p-6  rounded-lg bg-neutral-900 bg-opacity-50 shadow-neutral-900/10">
            <h1 className='text-sm font-bold text-slate-300 mb-2'>
                Relatório por Cidade
            </h1>
            <ResponsiveContainer >
                <BarChart data={transformedData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number) => [`${value}`, `Cidades`]}
                        labelFormatter={(name) => `Cidade: ${name}`}
                    />

                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="uv" name="Cidades" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function transformDataForRecharts(data: { name: string, uv: number }[], COLORS: string[]) {
    return data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length]
    }));
}
