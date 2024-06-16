// App.js

import Login from "./member/Login";
import Sign_up from "./member/Sign_up";
import Mainpage from './main/Mainpage';
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";

import Balance from './asset/view/Balance';
import Income from './asset/view/Income';
import History from './asset/view/History';
import Rankings from './asset/view/Rankings';
import Footer from "./asset/view/Footer";


function App() {

  return (
    <div className="App">
      {/* <Login/> */}
          
      <BrowserRouter>
        <Link to={"/asset/balance"}>Balance</Link>
        <Link to={"/asset/income"}>Income</Link>
        <Link to={"/asset/history"}>History</Link>
        <Link to={"/asset/rankings"}>Rankings</Link>
        <Routes>
          <Route path="/" element= {<Mainpage/>} />
          <Route path="/login" element= {<Login/>} />
          <Route path='/asset/balance' element={<Balance/>}/>
          <Route path='/asset/income' element={<Income/>}/>
          <Route path='/asset/history' element={<History/>}/>
          <Route path='/asset/rankings' element={<Rankings/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;