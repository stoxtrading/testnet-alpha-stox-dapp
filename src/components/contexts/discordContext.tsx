import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface DiscordContextType {
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  discordUserName: string;
  setDiscordUserName: (userName: string) => void;
}

export const DiscordContext = createContext<DiscordContextType | undefined>(undefined);

export const DiscordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    const saved = localStorage.getItem('isDiscordVerified');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [discordUserName, setDiscordUserName] = useState<string>(() => {
    return localStorage.getItem('discordUserName') || '';
  });

  useEffect(() => {
    localStorage.setItem('isDiscordVerified', JSON.stringify(isVerified));
  }, [isVerified]);

  useEffect(() => {
    localStorage.setItem('discordUserName', discordUserName);
  }, [discordUserName]);

  return (
    <DiscordContext.Provider value={{ isVerified, setIsVerified, discordUserName, setDiscordUserName }}>
      {children}
    </DiscordContext.Provider>
  );
};