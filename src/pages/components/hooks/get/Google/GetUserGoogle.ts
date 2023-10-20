// hooks/GetUserGoogle.ts

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const GetUserGoogle = (userId: string | null) => {
    const { data, error } = useSWR(userId ? `/api/UsuarioGoogle?userId=${userId}` : null, fetcher);

    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    };
};

export default GetUserGoogle;
