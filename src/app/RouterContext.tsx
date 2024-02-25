// Archivo: context/RouterContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { NextRouter } from 'next/router';

interface RouterContextProps {
    router: NextRouter;
}

interface RouterProviderProps {
    router: NextRouter;
    children: ReactNode;
}

const RouterContext = createContext<RouterContextProps | undefined>(undefined);

export const RouterProvider: React.FC<RouterProviderProps> = ({ router, children }) => (
    <RouterContext.Provider value={{ router }}>{children}</RouterContext.Provider>
);

export const useCustomRouter = () => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error('useCustomRouter debe ser usado dentro de un RouterProvider');
    }
    return context;
};
