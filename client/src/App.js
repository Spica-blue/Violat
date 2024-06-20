import Login from "./member/Login";
import Mainpage from './main/Mainpage';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './header/Header';
import Balance from './asset/view/Balance';
import Income from './asset/view/Income';
import History from './asset/view/History';
import Rankings from './asset/view/Rankings';
import Footer from "./asset/view/Footer";
import SignUp from "./member/SignUp";
import TradeLog from "./asset/view/TradeLog";
import Buy from "./asset/view/Buy";
import Sell from "./asset/view/Sell";
import Mypage from './member/Mypage';
import Stock from "./trade/Stock";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/member/SignUp" element={<SignUp />} />
          <Route path="/member/login" element={<Login />} />
          <Route path='/asset/balance' element={<Balance />} />
          <Route path='/asset/income' element={<Income />} />
          <Route path='/asset/history' element={<History />} />
          <Route path='/asset/rankings' element={<Rankings />} />
          <Route path='/asset/buy' element={<Buy />} />
          <Route path='/asset/sell' element={<Sell />} />
          <Route path='/asset/tradeLog' element={<TradeLog />} />
          {/* <Route path='/asset/distribution' element={<AssetDistribution accountNum="1111" />} /> */}
          <Route path='/trade/stock/*' element={<Stock/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
