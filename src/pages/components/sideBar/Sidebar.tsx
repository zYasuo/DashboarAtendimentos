import { Fragment, useState } from 'react';
import { MobileSidebar } from './mobile/MobileSidebar';
import { DesktopSidebar } from './desktop/DesktopSidebar';

export function Sidebar() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleMobileSidebarToggle = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <Fragment>
            <MobileSidebar isOpen={isMobileSidebarOpen} onToggle={handleMobileSidebarToggle} />
            <DesktopSidebar />
        </Fragment>
    );
}
