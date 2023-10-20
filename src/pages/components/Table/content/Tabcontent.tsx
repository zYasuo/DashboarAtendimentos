import React, { ReactNode } from 'react';
interface TabContentProps {
    children: ReactNode;
}

export function TabContent({ children }: TabContentProps) {
    return (
        <div className="tab-content">
            {children}
        </div>

    );
}
