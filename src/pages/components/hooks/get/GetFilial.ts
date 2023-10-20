import { useState, useEffect } from 'react';
import { api } from '../InstanceApi/Api';

export interface Filial {
    id: number;
    nome: string;
}

export const useFetchFilial = () => {
    const [data, setData] = useState<Filial[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get('/Filial');
                setData(result.data);
                setLoading(false);
            } catch (error: unknown) {
                setError(error as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
