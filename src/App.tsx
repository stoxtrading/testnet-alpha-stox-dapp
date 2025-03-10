import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TestnetLimitOrderBookPage from './pages/testnetLimitOrderBookPage/TestnetLimitOrderBookPage';
import TokenomicsPage from './pages/TokenomicsPage/TokenomicsPage';
import WelcomePage from './pages/welcomePage/WelcomePage';
import CryptoWrapper from './components/cryptoWapper/CryptoWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RewardsPage from './pages/rewardsPage/RewardsPage';
import WhitepaperPage from './pages/whitepaperPage/WhitepaperPage';
import './App.css';
import AirdropPage from './pages/AirdropPage.tsx/AirdropPage';
import ValidateDiscord from './components/authentication/validateDiscord.tsx';
import { DiscordProvider } from './components/contexts/discordContext';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <CryptoWrapper>
      <DiscordProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/*   <Route index element={<Navigate to="/" replace />} /> */}
              <Route index path="/" element={<WelcomePage />} />
              <Route path="trading" element={<TestnetLimitOrderBookPage />} />
              <Route path="liquidity" element={<TokenomicsPage/>} />
              <Route path="smart-contracts" element={<WhitepaperPage/>} />
              <Route path="rewards" element={<RewardsPage/>} />
              <Route path="airdrop" element={<AirdropPage/>} />
              <Route path="validate-discord-auth" element={<ValidateDiscord/>} />
            </Route>
          </Routes>
        </BrowserRouter>
        </DiscordProvider>
      </CryptoWrapper>
    </QueryClientProvider>
  );
}

export default App;