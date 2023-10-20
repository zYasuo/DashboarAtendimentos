'use client'
import { Sidebar } from './components/sideBar/Sidebar';
import { Card } from './components/Card/Card';
import { AssuntoChart } from './components/Charts/AssuntoChart';
import { ChamadoChart } from './components/Charts/ChamadoChart';
import { CidadeChart } from './components/Charts/CidadeChart';
import { AtendimentosChamadosByDateChart } from './components/Charts/DataChart';
import { DataProvider, useData } from './components/hooks/DataContext';
import { TabList } from './components/Table/tabs/Tabs';
import { FiUsers, FiPhoneCall, FiList } from 'react-icons/fi';
import { UserComponent } from './components/User/UserComponent';
import { Tabs } from './components/Table/MainTabs';

export default function Dashboard() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-black">
      <Sidebar />
      <DataProvider>
        <MainContent />
      </DataProvider>
    </div>
  );
}

function MainContent() {
  const { atendimentos, chamados } = useData();

  const atendimentoCount = atendimentos.length;
  const chamadoCount = chamados?.length ?? 0;
  const total = atendimentoCount + chamadoCount;

  return (
    <main className="flex-1 p-4 sm:p-6 pl-20 sm:ml-60">
      <UserSection />
      <GeneralReport atendimentoCount={atendimentoCount} chamadoCount={chamadoCount} total={total} />
      <DetailedReport />
      <TabSection />
    </main>
  );
}

// Componentes extraídos para melhor organização e legibilidade:

function UserSection() {
  return (
    <div className='flex pb-3 justify-end items-center'>
      <UserComponent />
    </div>
  );
}

interface GeneralReportProps {
  atendimentoCount: number;
  chamadoCount: number;
  total: number;
}

function GeneralReport({ atendimentoCount, chamadoCount, total }: GeneralReportProps) {
  return (
    <div>
      <h1 className='text-sm font-bold text-slate-300'>
        Relatório Geral
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        <Card icon={<FiUsers className="w-8 h-8" />} description="Atendimentos" count={atendimentoCount} />
        <Card icon={<FiPhoneCall className="w-8 h-8" />} description="Chamados" count={chamadoCount} />
        <Card
          icon={<FiList className="w-8 h-8" />}
          description="Total"
          count={total}
          extraClassName="bg-dl-700"
        />


      </div>
    </div>
  );
}



function DetailedReport() {
  return (
    <>
      <h1 className='text-sm font-bold text-slate-300 mt-5'>Relatório Detalhado</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DataProvider>
          <AssuntoChart />
          <CidadeChart />
        </DataProvider>
        <ChamadoChart />
      </div>
    </>
  );
}

function TabSection() {
  return (
    <div className="mt-8 flex flex-col md:grid md:grid-cols-2 gap-4 items-center justify-center md:items-stretch">

      <div className="text-slate-300 shadow-lg rounded-lg p-6 bg-neutral-900 bg-opacity-50 shadow-neutral-900/10 w-full md:w-auto flex flex-col justify-center">
        <TabList tabs={Tabs()} />
      </div>
      <div className="text-slate-300 shadow-lg rounded-lg p-6 bg-neutral-900 bg-opacity-50 shadow-neutral-900/10 w-full md:w-auto flex flex-col justify-center">
        <AtendimentosChamadosByDateChart />
      </div>
    </div>
  );
}



