import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Sidebar.module.css'; // CSS 모듈 파일을 사용하여 스타일링
import { Link } from 'react-router-dom';
import ScrollBar from '../components/ScrollBar';

function Sidebar({ onStockSelect }) {
  const [stockName, setStockName] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const [error2, setError2] = useState(null);
  const [activeTab, setActiveTab] = useState('현재가');

  useEffect(() => {
    fetchAllStocks();
    startWebsocketServer();
    connectToRealtimeData();
    const interval = setInterval(() => {
      if (!stockInfo && !error2) {
        fetchFilteredStockData();
      }
    }, 1000); // 1초마다 실시간 데이터 가져오기
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [stockInfo, error2]);

  useEffect(() => {
    let interval;
    if (stockInfo) {
      interval = setInterval(() => {
        getStockInfoByName(stockName);
      }, 1000); // 1초마다 검색된 종목 데이터 가져오기
    }
    return () => clearInterval(interval);
  }, [stockInfo, stockName]);

  const startWebsocketServer = async () => {
    try {
      const response = await axios.post('http://localhost:8000/trade/start-websocket-server/');
      console.log(response.data.message);
    } catch (error) {
      console.log("웹소켓 서버 시작 중 에러 발생:", error);
    }
  };

  const connectToRealtimeData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/trade/connect-realtime-data/');
      console.log(response.data.message);
    } catch (error) {
      console.log("실시간 데이터 연결 중 에러 발생:", error);
    }
  };

  const fetchAllStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/trade/stocks/');
      console.log("fetchhhh : ", response.data)
      setAllStocks(response.data);
      // setStockInfo(null); // 전체 종목을 가져올 때 개별 종목 정보를 초기화
      // setError2(null); // 에러 초기화
    } catch (error) {
      console.log("전체 종목 데이터를 가져오는 중 에러 발생:", error);
      setError2('전체 종목 데이터를 가져오는 중 에러가 발생했습니다.');
    }
  };

  const fetchFilteredStockData = async () => {
    // console.log("fetchFilteredStockData 함수 호출됨"); // 함수 호출 확인
    try {
      const response = await axios.get('http://localhost:8000/trade/filtered-stock-data/');
      // console.log("API 응답: ", response.data); // 응답 데이터 확인
      const updatedStock = response.data;
      if (Array.isArray(updatedStock)) {
        setAllStocks(prevStocks => {
          const updatedStocks = prevStocks.map(stock => {
            const foundStock = updatedStock.find(us => us.stock_code === stock.stock_code);
            if (foundStock) {
              // console.log("업데이트된 주식 데이터: ", foundStock);
              return foundStock;
            }
            return stock;
          });
          return updatedStocks;
        });
      } else {
        console.log("API 응답이 배열 형식이 아닙니다: ", updatedStock);
      }
      // setError2(null); // 에러 초기화
    } catch (error) {
      console.log("실시간 데이터를 가져오는 중 에러 발생:", error);
      setError2('실시간 데이터를 가져오는 중 에러가 발생했습니다.');
    }
  };

  const getStockInfoByName = async (name) => {
    try {
      const response = await axios.post('http://localhost:8000/trade/stock-info/', { stock_name: name });
      setStockInfo(response.data);
      setError2(null); // 에러 초기화
    } catch (error) {
      console.log("종목 정보를 가져오는 중 에러 발생:", error);
      setError2('종목 정보를 가져오는 중 에러가 발생했습니다.');
      setStockInfo(null); // 에러 발생 시 개별 종목 정보를 초기화
    }
  };

  const getStockInfo = async () => {
    if (stockName.trim() === '') {
      setStockInfo(null); // 검색어가 비어있을 때 stockInfo를 초기화하여 전체 종목 데이터를 가져오도록 함
      setError2(null);
      fetchAllStocks();
      return;
    }
    getStockInfoByName(stockName);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <input
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            placeholder="종목명을 입력하세요"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                getStockInfo();
              }
            }}
          />
          <button onClick={getStockInfo}>조회</button>
        </div>
      </div>
      <div className={styles.tableContainer}>
      <ul className={styles.ul}>
          <li className={styles.category}>
            <Link 
              to="#" 
              className={`${styles.on} ${activeTab === '현재가' ? styles.active : ''}`} 
              title="원화" 
              onClick={() => setActiveTab('현재가')}
            >
              현재가
            </Link>
          </li>
          {/* <li className={styles.category}>
            <Link 
              to="#" 
              className={`${styles.on} ${activeTab === '보유' ? styles.active : ''}`} 
              title="보유" 
              onClick={() => setActiveTab('보유')}
            >
              보유
            </Link>
          </li> */}
          <li className={styles.category}>
            <Link 
              to="#" 
              className={`${styles.on} ${activeTab === '관심' ? styles.active : ''}`} 
              title="관심" 
              onClick={() => setActiveTab('관심')}
            >
              관심
            </Link>
          </li>
        </ul>
        <ScrollBar>
        <table>
          <thead>
            <tr>
              <th>종목명</th>
              <th>현재가</th>
              <th>전일대비</th>
              <th>거래대금(백만)</th>
            </tr>
          </thead>
          <tbody>
            {error2 ? (
              <tr className={styles.errorRow}>
                <td colSpan="4" className={styles.errorCell}>{error2}</td>
              </tr>
            ) : stockInfo ? (
              <tr>
                <td className={styles.stockNameCell}><Link to={`/trade/stock/${stockInfo.stock_name}`}>{stockInfo.stock_name}{console.log("검새ㅐㅐㅐㅐㅐㅐㄱ:",stockInfo)}</Link></td>
                <td>{stockInfo.current_price}</td>
                <td
                  style={{
                    color: parseFloat(stockInfo.price_change) > 0 ? 'red' : parseFloat(stockInfo.price_change) < 0 ? 'blue' : 'black'
                  }}
                >
                  {parseFloat(stockInfo.price_change) > 0 ? '▲' : parseFloat(stockInfo.price_change) < 0 ? '▼' : ''}
                  {stockInfo.price_change}
                </td>
                <td>{stockInfo.trading_volume}</td>
              </tr>
            ) : (
              allStocks.map((stock, index) => (
                <tr key={index}>
                  <td className={styles.stockNameCell}><Link to={`/trade/stock/${stock.stock_name}`}>{stock.stock_name}</Link></td> {/* 종목 코드 */}
                  <td>{stock.current_price}</td> {/* 현재가 */}
                  <td
                    style={{
                      color: parseFloat(stock.price_change) > 0 ? 'red' : parseFloat(stock.price_change) < 0 ? 'blue' : 'black'
                    }}
                  >
                    {parseFloat(stock.price_change) > 0 ? '▲' : parseFloat(stock.price_change) < 0 ? '▼' : ''}
                    {stock.price_change}
                  </td>
                  <td>{stock.trading_volume}</td> {/* 거래대금 */}
                </tr>
              ))
            )}
          </tbody>
        </table>
        </ScrollBar>
      </div>
    </div>
  );
}

export default Sidebar;
