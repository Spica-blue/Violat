// App.js

import Login from "./member/Login";
import Mainpage from './main/Mainpage';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Header from './header/Header';
import Balance from './asset/view/Balance';
import Income from './asset/view/Income';
import History from './asset/view/History';
import Rankings from './asset/view/Rankings';
import Footer from "./asset/view/Footer";
import SignUp from "./member/SignUp";
import Mypage from './member/Mypage';
import Stock from "./trade/Stock";
import FooterSub from "./asset/view/FooterSub";
import Account from "./member/Account";


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
          <Route path='/asset/balance' element={<Balance/>}/>
          <Route path='/asset/income' element={<Income/>}/>
          <Route path='/asset/history' element={<History/>}/>
          <Route path='/asset/rankings' element={<Rankings/>}/>
          <Route path='/trade/stock/:stockName/*' element={<Stock/>}/>
          <Route path='/view/FooterSub' element={<FooterSub/>}/>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;