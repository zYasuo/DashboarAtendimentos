import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiGrid, FiHome, FiAlertCircle, FiPhone, FiUser, FiLogOut } from 'react-icons/fi';

export function DesktopSidebar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        router.push('/');
    };

    const isActive = (path: string) => router.pathname === path;

    const getItemClassNames = (path: string) => {
        const baseClasses = "flex items-center py-2 px-3 rounded-md hover:bg-dl-700 hover:text-slate-50 transition-all duration-300";
        const activeClasses = isActive(path) ? 'border-l-4 border-dl-700 text-dl-400' : 'text-dl-400 text-opacity-20 border-l-4 border-transparent';
        return `${baseClasses} ${activeClasses}`;
    };

    return (
        <div className="hidden sm:block">
            <div className="flex flex-col h-screen w-64 bg-neutral-900 bg-opacity-50 shadow-lg fixed top-0 left-0">
                <div className="flex items-center justify-center h-16 px-4 sm:px-6">
                    <Link href="/Dashboard" passHref>
                        <div className="flex items-center text-xl text-dl-400 font-bold cursor-pointer">
                            <FiGrid className="inline-block w-5 h-5 mr-2 text-slate-400" />
                            Dashboard
                        </div>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="px-2 pt-10 space-y-4">
                        <Link href="/Dashboard" passHref>
                            <div className={getItemClassNames("/Dashboard") + " cursor-pointer my-2"}>
                                <FiHome className=" text-slate-400 inline-block w-6 h-6 mr-2" /> Dashboard
                            </div>
                        </Link>
                        <Link href="/Atendimento" passHref>
                            <div className={getItemClassNames("/Atendimento") + " cursor-pointer my-2"}>
                                <FiPhone className=" text-slate-400 inline-block w-6 h-6 mr-2" /> Atendimentos
                            </div>
                        </Link>
                        <Link href="/chamados" passHref>
                            <div className={getItemClassNames("/chamados") + " cursor-pointer my-2"}>
                                <FiAlertCircle className=" text-slate-400 inline-block w-6 h-6 mr-2" /> Chamados
                            </div>
                        </Link>
                    </nav>
                </div>
                <div className="border-t border-slate-400 p-4 flex flex-col space-y-4 cursor-pointer">
                    <div
                        className="flex items-center text-slate-400 hover:bg-dl-700 hover:text-slate-50 py-2 px-3 rounded-md"
                    >
                        <FiUser className=" text-slate-400 inline-block w-6 h-6 mr-2" />
                        <span className="">Perfil</span>
                    </div>
                    <div
                        className="flex items-center text-slate-400 hover:bg-dl-700 hover:text-slate-50 py-2 px-3 rounded-md"
                        onClick={handleLogout}
                    >
                        <FiLogOut className=" text-slate-400 inline-block w-6 h-6 mr-2" />
                        <span className="   ">Sair</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
