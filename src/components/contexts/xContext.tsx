import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface XContextType {
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  xUserName: string;
  setXUserName: (userName: string) => void;
}

export const XContext = createContext<XContextType | undefined>(undefined);

export const XProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    const saved = localStorage.getItem('isXVerified');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [xUserName, setXUserName] = useState<string>(() => {
    return localStorage.getItem('xUserName') || '';
  });

  useEffect(() => {
    localStorage.setItem('isXVerified', JSON.stringify(isVerified));
  }, [isVerified]);

  useEffect(() => {
    localStorage.setItem('xUserName', xUserName);
  }, [xUserName]);

  return (
    <XContext.Provider value={{ isVerified, setIsVerified, xUserName, setXUserName }}>
      {children}
    </XContext.Provider>
  );
};