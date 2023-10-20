
import { SVGProps, ComponentType } from 'react';

type SidebarLinkProps = {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    isOpen: boolean;
    onToggle: () => void;
    isActive: boolean;
    label: string;
};

export function SidebarLink({ icon: Icon, isActive, label }: SidebarLinkProps) {
    return (
        <a href="#" className={`block ${isActive ? 'text-gray-800' : 'text-gray-600'} hover:bg-slate-400 hover:text-slate-950 py-2 px-3 rounded-md`}>
            <Icon className="inline-block w-5 h-5 mr-2 " /> {label}
        </a>
    );
}
