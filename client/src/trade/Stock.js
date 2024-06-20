import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import StockChart from "./StockChart";
import Sidebar from './Sidbar';
import TradeLog from "../asset/view/TradeLog";
import styles from "./Stock.module.css";
import Trade from "./Trade";

function Stock() {
  const { stockName } = useParams(); // Get stockName from URL

  console.log("stock에서는 들어오겠지",stockName)

  return (
    <div className={styles.display}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.chartContainer}>
        {/* <Routes>
          <Route path=":stockName" element={<StockChart stockName={stockName}/>} />
        </Routes> */}
        <StockChart stockName={stockName} />
        <div className={styles.tradeLog}>
          <div className={styles.tradeLogSection}>
            <span style={{fontSize:'22px',fontWeight:'bold'}}>거래내역</span>
            <TradeLog />
          </div>
          <div className={styles.tradeSection}>
            <Trade />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;