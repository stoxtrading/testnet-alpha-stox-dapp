import { useContext } from 'react';
import { EthSignedTxContext } from './ethSignedTxContext';

export const useEthSignedTxContext = () => {
  const context = useContext(EthSignedTxContext);
  if (context === undefined) {
    throw new Error('useEthSignedTxContext must be used within an EthSignedTxContextProvider');
  }
  return context;
};