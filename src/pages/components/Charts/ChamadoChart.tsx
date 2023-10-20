import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { useFetchChamados } from '../hooks/get/GetChamados';
import { aggregateByAssunto } from '../../utils/TransformData';
export function ChamadoChart() {
    const { data: fetchedData, loading, error } = useFetchChamados();

    const COLORS = ['#6AD2FF', '#413EA0', '#FF7300'];

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar dados...</p>;
    if (!fetchedData) return <p>Dados não disponíveis</p>;

    const aggregatedData = aggregateByAssunto(fetchedData);

    return (
        <div className="w-full h-80 p-4 bg-opacity-50 shadow-xl  rounded-lg bg-neutral-900 shadow-neutral-900/10 ">
            <h1 className='text-sm font-bold text-slate-300 '>
                Relatório por Chamado
            </h1>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={aggregatedData}
                        dataKey="uv"
                        nameKey="name"
                        outerRadius={80}
                        fill="#8884d8"
                    >
                        {
                            aggregatedData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

