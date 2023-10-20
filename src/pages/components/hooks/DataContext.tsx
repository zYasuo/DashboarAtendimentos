
import { createContext, useContext, ReactNode, useState } from 'react';
import { useFetchAtendimento, Atendimento } from './get/GetAtendimentos';
import { useFetchChamados, Chamado } from './get/GetChamados';
import { useFetchFilial, Filial } from './get/GetFilial';
import { useFetchAssuntos, Assunto } from './get/GetAssuntos';

export interface DataStore {
    atendimentos: Atendimento[];
    chamados: Chamado[];
    loading: boolean;
    filiais: Filial[];
    assuntos: Assunto[];
    error: Error | null;
    token: string | null;
    userId: string | null;
}


const DataContext = createContext<DataStore | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const { data: atendimentosData, loading: atendimentosLoading, error: atendimentosError } = useFetchAtendimento();
    const { data: chamadosData, loading: chamadosLoading, error: chamadosError } = useFetchChamados();
    const { data: filialData, loading: filialLoading, error: filialError } = useFetchFilial();
    const { data: assuntosData, loading: assuntosLoading, error: assuntosError } = useFetchAssuntos();

    const dataStore: DataStore = {
        atendimentos: atendimentosData || [],
        chamados: chamadosData || [],
        filiais: filialData || [],
        assuntos: assuntosData || [],
        token: token,
        userId: userId,
        loading: atendimentosLoading || chamadosLoading || filialLoading || assuntosLoading,
        error: atendimentosError || chamadosError || filialError || assuntosError,
    };

    return (
        <DataContext.Provider value={dataStore}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
