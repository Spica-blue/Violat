import React, { useState } from "react";
import Buy from "../../portfolio/views/Buy";
import Sell from "../../portfolio/views/Sell";
import TradeLog from "../../portfolio/views/TradeLog";
import TradeHeader from "../../portfolio/views/TradeHeader";
import styles from "../styles/Trade.module.css";

function Trade({ onTradeComplete }) {
  const [activeTab, setActiveTab] = useState("buy");

  const renderContent = () => {
    switch (activeTab) {
      case "buy":
        return <Buy onTradeComplete={onTradeComplete} />;
      case "sell":
        return <Sell onTradeComplete={onTradeComplete} />;
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
    </div>
  );
}

export default Trade;
