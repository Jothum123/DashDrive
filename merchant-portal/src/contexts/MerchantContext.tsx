import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type ServiceType = 'FOOD' | 'MART' | 'STAY';

interface MerchantContextType {
    serviceType: ServiceType;
    setServiceType: (type: ServiceType) => void;
}

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [serviceType, setServiceType] = useState<ServiceType>('FOOD');

    return (
        <MerchantContext.Provider value={{ serviceType, setServiceType }}>
            {children}
        </MerchantContext.Provider>
    );
};

export const useMerchantContext = () => {
    const context = useContext(MerchantContext);
    if (context === undefined) {
        throw new Error('useMerchantContext must be used within a MerchantProvider');
    }
    return context;
};
