import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TestnetLimitOrderBookPage from './pages/testnetLimitOrderBookPage/TestnetLimitOrderBookPage';
import TokenomicsPage from './pages/TokenomicsPage/TokenomicsPage';
import WelcomePage from './pages/welcomePage/WelcomePage';
import CryptoWrapper from './components/cryptoWapper/CryptoWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css';
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <CryptoWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/*   <Route index element={<Navigate to="/" replace />} /> */}
              <Route index path="/" element={<WelcomePage />} />
              <Route path="testnet-limit-order-book" element={<TestnetLimitOrderBookPage />} />
              <Route path="tokenomics" element={<TokenomicsPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CryptoWrapper>
    </QueryClientProvider>
  );
}

export default App;