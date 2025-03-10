import { useContext } from 'react';
import { DiscordContext } from './discordContext';

export const useDiscord = () => {
  const context = useContext(DiscordContext);
  if (context === undefined) {
    throw new Error('useDiscord must be used within a DiscordProvider');
  }
  return context;
};