import { TabContent } from '../content/Tabcontent';
import { Table } from '../data/DataTable';
import { useData } from '../../hooks/DataContext';
import { columnsChamados } from './colunas/columnsChamados';
import { FaHeadset } from 'react-icons/fa';

export const ChamadosTab = () => {
    const { chamados } = useData();

    return (
        <TabContent>
            <FaHeadset className="inline-block text-lg mr-2 text-dl-700" />
            <span className="font-bold text-slate-300"> Chamados</span>
            {chamados && <Table columns={columnsChamados} data={chamados} />}
        </TabContent>
    );
};
