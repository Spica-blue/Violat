// App.js

import Login from "./components/member/views/Login";
import Mainpage from './pages/MainPage/Mainpage';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Header from './components/layout/Header/Header';
import Balance from './components/portfolio/views/Balance';
import Income from './components/portfolio/views/Income';
import History from './components/portfolio/views/History';
import Rankings from './components/portfolio/views/Rankings';
import Footer from "./components/portfolio/views/Footer";
import SignUp from "./components/member/views/SignUp";
import Mypage from './components/member/views/Mypage';
import Stock from "./components/trade/views/Stock";
import FooterSub from "./components/portfolio/views/FooterSub";
import Account from "./components/member/views/Account";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar/> */}
        <Header/>
        <Routes>
          <Route path="/" element= {<Mainpage/>} />
          <Route path="/member/SignUp" element= {<SignUp/>} />
          <Route path="/member/login" element= {<Login/>} />
          <Route path="/member/Mypage" element= {<Mypage/>} />
          <Route path="/member/Account" element= {<Account/>} />
          <Route path='/portfolio/balance' element={<Balance/>}/>
          <Route path='/portfolio/income' element={<Income/>}/>
          <Route path='/portfolio/history' element={<History/>}/>
          <Route path='/portfolio/rankings' element={<Rankings/>}/>
          <Route path='/trade/stock/:stockName/*' element={<Stock/>}/>
          <Route path='/view/FooterSub' element={<FooterSub/>}/>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;