// App.js

import Login from "./member/Login";
import Mainpage from './main/Mainpage';
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import SignUp from './member/SignUp';
import Header from './header/Header';
import Balance from './asset/view/Balance';
import Income from './asset/view/Income';
import History from './asset/view/History';
import Rankings from './asset/view/Rankings';
import Footer from "./asset/view/Footer";
import Mypage from './member/Mypage';
import Sidebar from "./trade/Sidbar";
import StockChart from "./trade/StockChart";


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
          <Route path='/asset/balance' element={<Balance/>}/>
          <Route path='/asset/income' element={<Income/>}/>
          <Route path='/asset/history' element={<History/>}/>
          <Route path='/asset/rankings' element={<Rankings/>}/>
          <Route path="/member/Mypage" element= {<Mypage/>} />
          <Route path="/trade/stock/:stockName" element= {<StockChart/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;