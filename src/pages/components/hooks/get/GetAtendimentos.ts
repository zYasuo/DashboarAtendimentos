import { useState, useEffect } from 'react';
import { api } from '../InstanceApi/Api';
import { getItem } from '../../../utils/localStorage/Storage';

export interface Atendimento {
    id: number;
}

export const useFetchAtendimento = (url: string = '/Atendimentos') => {

    const [data, setData] = useState<Atendimento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const userId = getItem('userId');
            if (!userId) {
                setError(new Error("User ID not found."));
                setLoading(false);
                return;
            }

            try {
                const result = await api.get(url, {
                    params: { usuario_id: userId }
                });
                setData(result.data);
                setLoading(false);
            } catch (error: unknown) {
                setError(error as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};
