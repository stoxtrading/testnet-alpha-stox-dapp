import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface EthSignedTxContextType {
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
 
}

export const EthSignedTxContext = createContext<EthSignedTxContextType | undefined>(undefined);

export const EthSignedTxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    const saved = localStorage.getItem('isEthSignedTxVerified');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('isEthSignedTxVerified', JSON.stringify(isVerified));
  }, [isVerified]);



  return (
    <EthSignedTxContext.Provider value={{ isVerified, setIsVerified, }}>
      {children}
    </EthSignedTxContext.Provider>
  );
};