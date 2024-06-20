// App.js

import Login from "./member/Login";
import Mainpage from './main/Mainpage';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from './member/SignUp'
import Header from './header/Header';
import Balance from './asset/view/Balance';
import Income from './asset/view/Income';
import History from './asset/view/History';
import Rankings from './asset/view/Rankings';
import Footer from "./asset/view/Footer";
import Buy from "./asset/view/Buy";
import Sell from "./asset/view/Sell";
import TradeLog from "./asset/view/TradeLog";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element= {<Mainpage/>} />
          <Route path="/member/Sign_up" element= {<SignUp/>} />
          <Route path="/login" element= {<Login/>} />
          <Route path='/asset/balance' element={<Balance/>}/>
          <Route path='/asset/income' element={<Income/>}/>
          <Route path='/asset/history' element={<History/>}/>
          <Route path='/asset/rankings' element={<Rankings/>}/>
          <Route path='/asset/buy' element={<Buy/>}/>
          <Route path='/asset/sell' element={<Sell/>}/>
          <Route path='/asset/tradeLog' element={<TradeLog/>}/>
          {/* <Route path='/asset/tradeLog' element={<TradeLog/>}/> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;