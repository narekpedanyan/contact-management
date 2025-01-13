import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
    triggerEvent: (event: string) => void;
    sidebarEvents: string[];
    clearEvents: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('SidebarProvider');
    }
    return context;
};

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sidebarEvents, setSidebarEvents] = useState<string[]>([]);

    const triggerEvent = (event: string) => {
        setSidebarEvents((prev) => [...prev, event]);
    };

    const clearEvents = () => {
        setSidebarEvents([]);
    };

    return (
        <SidebarContext.Provider value={{ triggerEvent, sidebarEvents, clearEvents }}>
            {children}
        </SidebarContext.Provider>
    );
};
