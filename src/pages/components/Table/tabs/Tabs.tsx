import React, { useState, useEffect } from 'react';

type Tab = {
    name: string;
    label: string;
    content: React.ReactNode;
}

type TabListProps = {
    tabs: Tab[];
}

export function TabList({ tabs }: TabListProps) {
    const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].name : '');
    useEffect(() => {
        if (tabs.length > 0) {
            setActiveTab(tabs[0].name);
        }
    }, [tabs]);
    const renderTabContent = () => {
        const active = tabs.find(tab => tab.name === activeTab);
        return active ? active.content : null;
    };

    return (
        <div>
            <div className="flex border-b-2 border-neutral-600 text-gray-50 ">
                {Array.isArray(tabs) && tabs.map(tab => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`py-2 border-b-2 font-bold  text-gray-50 px-4 transition duration-300 ease-in-out transform hover:scale-105 ${activeTab === tab.name ? 'border-b-4 border-dl-700' : 'border-b-2 border-transparent'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4 rounded-lg bg-neutral-900 bg-opacity-50 shadow-neutral-900/10">
                {renderTabContent()}
            </div>
        </div>
    );
}

