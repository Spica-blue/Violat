import React from "react";
import { Route, Routes } from "react-router-dom";
import Buy from "../asset/view/Buy";
import Sell from "../asset/view/Sell";
import TradeHeader from "../asset/view/TradeHeader";
import styles from "./Trade.module.css";

function Trade() {
  return (
    <div className={styles.tradeContainer}>
      <TradeHeader />
      <div className={styles.tradeContent}>
        <Routes>
          <Route path="tradeBuy" element={<Buy />} />
          <Route path="tradeSell" element={<Sell />} />
        </Routes>
      </div>
    </div>
  );
}

export default Trade;
