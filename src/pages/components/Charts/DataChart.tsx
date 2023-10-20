import React from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { useData } from '../hooks/DataContext';
import { transformDataByDate } from '../../utils/TransformData';

function convertToDateObject(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}


export function AtendimentosChamadosByDateChart() {
    const { atendimentos = [], chamados = [], loading, error } = useData();

    const atendimentoMapped = Array.isArray(atendimentos)
        ? atendimentos.map(item => ({ date: item.dataAbertura, type: "atendimento" }))
        : [];

    const chamadosMapped = Array.isArray(chamados)
        ? chamados.map(item => ({ date: item.dataAbertura, type: "chamado" }))
        : [];

    const mergedData = [...atendimentoMapped, ...chamadosMapped];
    const transformedData = transformDataByDate(mergedData);

    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);

    const lastThreeDaysData = transformedData.filter(dataItem => {
        const dataDate = convertToDateObject(dataItem.name);
        return dataDate >= threeDaysAgo && dataDate <= today;
    });

    if (loading) return <p className="text-center">Carregando...</p>;
    if (error) return <p className="text-center">Erro ao carregar dados...</p>;

    return (
        <div className="w-full h-80 p-10 bg-opacity-50 shadow-xl rounded-lg bg-neutral-900 shadow-neutral-900/10">
            <h1 className="text-sm font-bold text-slate-300 mb-4">
                Atendimentos e Chamados por Data
            </h1>
            <ResponsiveContainer>
                <ComposedChart data={lastThreeDaysData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atendimentos" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="chamados" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
