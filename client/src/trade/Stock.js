import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../asset/view/Footer";
import StockChart from "./StockChart";
import Sidebar from './Sidbar';

function Stock() {

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar/> */}
        <Header/>
        <Routes>
          <Sidebar/>
          <Route path="/trade/stock/:stockName" element= {<StockChart/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default Stock;