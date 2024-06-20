import React, { useState } from "react";
import Buy from "../asset/view/Buy";
import Sell from "../asset/view/Sell";
import TradeLog from "../asset/view/TradeLog";
import TradeHeader from "../asset/view/TradeHeader";
import styles from "./Trade.module.css";

function Trade() {
  const [activeTab, setActiveTab] = useState("buy");
  const [reloadLog, setReloadLog] = useState(false); // 추가된 상태

  const handleReloadLog = () => {
    setReloadLog(prev => !prev);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "buy":
        return <Buy onTradeComplete={handleReloadLog} />;
      case "sell":
        return <Sell onTradeComplete={handleReloadLog} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.tradeContainer}>
      <TradeHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className={styles.tradeContent}>
        {renderContent()}
      </div>
      <TradeLog reloadLog={reloadLog} />
    </div>
  );
}

export default Trade;
