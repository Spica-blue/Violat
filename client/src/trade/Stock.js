import React from "react";
import { Route, Routes } from "react-router-dom";
import StockChart from "./StockChart";
import Sidebar from './Sidbar';

function Stock() {

  return (
    <div className="App">
      <section style={{ display: 'flex' }}>
        <article style={{ flex: '0 0 20%' }}>
          <Sidebar />
        </article>
        <article style={{ flex: '1' }}>
          <Routes>
            <Route path=":stockName" element={<StockChart />} />
          </Routes>
        </article>
      </section>
    </div>
  );
}

export default Stock;