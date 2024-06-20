// App.js

import Login from "./member/Login";
import SignUp from "./member/SignUp";
import Mypage from "./member/Mypage";
import Mainpage from './main/Mainpage';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Header from './header/Header';
import Balance from './asset/view/Balance';
import Income from './asset/view/Income';
import History from './asset/view/History';
import Rankings from './asset/view/Rankings';
import Footer from "./asset/view/Footer";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
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
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;