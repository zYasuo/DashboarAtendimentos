import { TabContent } from '../content/Tabcontent';
import { Table } from '../data/DataTable';
import { useData } from '../../hooks/DataContext';
import { columns } from './coluna/columnsAtendimento';
import { FaHeadset } from 'react-icons/fa';


export const AtendimentoTab = () => {
    const { atendimentos } = useData();

    return (
        <TabContent>
            <FaHeadset className="inline-block text-lg mr-2 text-dl-700" />
            <span className="font-bold text-slate-300"> Atendimentos</span>
            {atendimentos && <Table columns={columns} data={atendimentos} />}
        </TabContent>
    );
};


