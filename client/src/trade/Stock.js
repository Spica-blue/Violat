import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StockChart from "./StockChart";
import Sidebar from './Sidebar';
import TradeLog from "../asset/view/TradeLog";
import styles from "./Stock.module.css";
import Trade from "./Trade";

function Stock() {
  const { stockName } = useParams(); // Get stockName from URL
  const [reloadLog, setReloadLog] = useState(false); // reloadLog 상태 추가

  const handleReloadLog = () => {
    setReloadLog(prev => !prev);
  };

  console.log("stock에서는 들어오겠지", stockName);

  return (
    <div className={styles.display}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.chartContainer}>
        <StockChart stockName={stockName} />
        <div className={styles.tradeLog}>
          <div className={styles.tradeLogSection}>
            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>거래내역</span>
            <TradeLog reloadLog={reloadLog} />
          </div>
          <div className={styles.tradeSection}>
            <Trade onTradeComplete={handleReloadLog} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;
