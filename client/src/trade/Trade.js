import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Buy from "../asset/view/Buy";
import Sell from "../asset/view/Sell";
import TradeHeader from "../asset/view/TradeHeader";
import styles from "./Trade.module.css";

function Trade() {
  const [activeTab, setActiveTab] = useState("buy");

  const renderContent = () => {
    switch (activeTab) {
      case "buy":
        return <Buy />;
      case "sell":
        return <Sell />;
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
