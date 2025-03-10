import { useContext } from 'react';
import { XContext } from './xContext';

export const useX = () => {
  const context = useContext(XContext);
  if (context === undefined) {
    throw new Error('useX must be used within a XProvider');
  }
  return context;
};