import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { api } from '../InstanceApi/Api'; // Atualize o caminho para onde você colocou o arquivo api.ts

export interface Assunto {
    id: number;
    nome: string;
}

export const useFetchAssuntos = (endpoint: string = '/Assuntos') => {
    const [data, setData] = useState<Assunto[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result: AxiosResponse<Assunto[]> = await api.get(endpoint);
                setData(result.data);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        fetchData();

        // A solicitação ocorrerá apenas uma vez quando o componente for montado.
        // Se você precisar refazer a solicitação quando certas propriedades ou estados mudarem,
        // adicione-os ao array de dependências.
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { data, loading, error };
};
