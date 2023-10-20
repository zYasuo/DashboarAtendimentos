import { FiHome, FiAlertCircle, FiPhone, FiArrowRight, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';


type MobileSidebarProps = {
    isOpen: boolean;
    onToggle: () => void;
};

export function MobileSidebar({ isOpen, onToggle }: MobileSidebarProps) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        router.push('/');
    };

    const isActive = (path: string) => router.pathname === path;

    const getItemClassNames = (path: string) => {
        const baseClasses = "flex items-center py-2 px-3 rounded-md hover:text-blue-600";
        const activeClasses = isActive(path) ? 'text-blue-50 bg-blue-700' : 'text-slate-400';
        return `${baseClasses} ${activeClasses}`;
    };

    return (
        <div className={`fixed inset-y-0 left-0 flex flex-col bg-neutral-900 shadow-lg z-10 transition-transform duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'} sm:hidden`}>
            <div className="relative flex items-center justify-center h-16 px-4 sm:px-6">
                {isOpen ? (
                    <Link href="/Dashboard" passHref>
                        <div className="mt-10 text-xl font-medium text-white cursor-pointer">
                            Dashboard
                        </div>
                    </Link>
                ) : ""}

                <button
                    onClick={onToggle}
                    className="absolute top-4 right-6 text-slate-400 hover:text-blue-600 cursor-pointer"
                >
                    {isOpen ? <FiX className="w-5 h-5 text-blue-700" /> : <FiArrowRight className="w-5 h-5 text-blue-700" />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <nav className="px-2 py-4 space-y-2">
                    <Link href="/Dashboard" passHref>
                        <div className={getItemClassNames("/Dashboard") + " cursor-pointer"}>
                            <FiHome className={`inline-block w-6 h-6 mr-2 ${isActive("/Dashboard") ? 'text-blue-50' : 'text-blue-700'}`} />
                            {isOpen && "Dashboard"}
                        </div>
                    </Link>
                    <Link href="/atendimentos" passHref>
                        <div className={getItemClassNames("/atendimentos") + " cursor-pointer"}>
                            <FiPhone className={`inline-block w-6 h-6 mr-2 ${isActive("/atendimentos") ? 'text-blue-50' : 'text-blue-700'}`} />
                            {isOpen && "Atendimentos"}
                        </div>
                    </Link>
                    <Link href="/chamados" passHref>
                        <div className={getItemClassNames("/chamados") + " cursor-pointer"}>
                            <FiAlertCircle className={`inline-block w-6 h-6 mr-2 ${isActive("/chamados") ? 'text-blue-50' : 'text-blue-700'}`} />
                            {isOpen && "Chamados"}
                        </div>
                    </Link>
                </nav>
            </div>

            <div className="px-2 py-4 space-y-2 border-t border-slate-400">
                <div className="flex items-center text-slate-400 hover:text-blue-600 py-2 px-3 rounded-md cursor-pointer">
                    <FiUser className="text-blue-700 inline-block w-6 h-6 mr-2" />
                    {isOpen && "Perfil"}
                </div>
                <div onClick={handleLogout} className="flex items-center text-slate-400 hover:text-blue-600 py-2 px-3 rounded-md cursor-pointer">
                    <FiLogOut className="text-blue-700 inline-block w-6 h-6 mr-2" />
                    {isOpen && "Sair"}
                </div>
            </div>
        </div>
    );
}