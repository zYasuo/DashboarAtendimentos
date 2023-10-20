import { Sidebar } from './components/sideBar/Sidebar';
import { DarkModeToggle } from './components/Darkmod/Darkmode';
import { TabList } from './components/Table/tabs/Tabs';
import { Tabs } from './components/Table/MainTabs';
import { DataProvider } from './components/hooks/DataContext';
import { FormAtendimento } from './components/Atendimento/FormAtendimento';


export default function Atendimento() {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen  dark:bg-gradient-to-r bg-black">
            <Sidebar />
            <DataProvider>
                <MainContent />
            </DataProvider>
        </div>
    );
}

function MainContent() {
    return (
        <main className="flex-1 p-4 sm:p-6 pl-20 sm:ml-60">
            <TopSection />
            <FormAtendimento />

            <TableSection />
        </main>
    );
}

function TopSection() {
    return (
        <div className='flex pb-3 justify-end items-center'>
            <DarkModeToggle />
        </div>
    );
}

function TableSection() {
    // const { atendimentos, chamados } = useData();

    return (
        <div className="mt-8 text-slate-400 shadow-lg rounded-lg p-6  bg-neutral-900 bg-opacity-50 shadow-neutral-900/10 border border-gray-800 border-opacity-50">
            <TabList tabs={Tabs()} />
        </div>
    );
}
