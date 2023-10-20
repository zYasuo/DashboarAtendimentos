import { TabContent } from './content/Tabcontent';
import { AtendimentoTab } from './atendimento/AtendimentoTab';
import { ChamadosTab } from './chamados/ChamadosTab';
import { useData } from '../hooks/DataContext';

export const Tabs = () => {
    const { loading, error } = useData();

    if (loading) {
        return [
            {
                name: 'loading',
                label: 'Carregando...',
                content: <TabContent>Carregando...</TabContent>
            },
        ];
    }

    if (error) {
        return [
            {
                name: 'error',
                label: 'Erro',
                content: <TabContent>Ocorreu um erro ao buscar os dados</TabContent>
            },
        ];
    }

    return [
        {
            name: 'tab1',
            label: 'Atendimentos',
            content: <AtendimentoTab />
        },
        {
            name: 'tab2',
            label: 'Chamados',
            content: <ChamadosTab />
        },
    ];
};
