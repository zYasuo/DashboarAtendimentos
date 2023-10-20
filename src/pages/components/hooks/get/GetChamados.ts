import { useState, useEffect } from 'react';
import { api } from '../InstanceApi/Api';
import { getItem } from '../../../utils/localStorage/Storage';

export interface Chamado {
    id: number;
}

export const useFetchChamados = () => {
    const [data, setData] = useState<Chamado[] | null>(null);
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
                const result = await api.get('/Chamados', {
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
    }, []);

    return { data, loading, error };
};
