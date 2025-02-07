import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import TestnetLimitOrderBookPage from './pages/testnetLimitOrderBookPage/TestnetLimitOrderBookPage';
import WelcomePage from './pages/welcomePage/WelcomPage';


function App() {
  return (


        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            {/*   <Route index element={<Navigate to="/" replace />} /> */}
            <Route index path="/" element={<WelcomePage  />} />
              <Route path="testnet-limit-order-book" element={<TestnetLimitOrderBookPage  />} />
            </Route>
          </Routes>
        </BrowserRouter>
     
  );
}

export default App;