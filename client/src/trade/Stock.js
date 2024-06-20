import React from "react";
import { Route, Routes } from "react-router-dom";
import StockChart from "./StockChart";
import Sidebar from './Sidbar';
import TradeLog from "../asset/view/TradeLog";
import styles from "./Stock.module.css";
import Trade from "./Trade";
import TradeHeader from './../asset/view/TradeHeader';

function Stock() {

  return (
    <div className={styles.display}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.chartContainer}>
        <Routes>
          <Route path=":stockName" element={<StockChart />} />
        </Routes>
        <div className={styles.tradeLog}>
          <div className={styles.tradeLogSection}>
            <span className={styles.span}>거래내역</span>
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