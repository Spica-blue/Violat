import { useEffect, useState } from 'react';
import styles from '../css/TradeLog.module.css';

export default function TradeLog({ reloadLog }) {
    const [logData, setLogData] = useState([]);
    const sessionId = window.sessionStorage.getItem("sessionid");

    useEffect(() => {
        fetch('http://127.0.0.1:8000/asset/tradeLog')
        .then(res => res.json())
        .then(data => {
            if (data !== undefined) {
                setLogData(data);
            } else {
                console.error('Unexpected response:', data);
                setLogData([]);
            }
        })
        .catch(error => {
            console.error('Error fetching trade log:', error);
            setLogData([]); // 기본값 설정
        });
    }, [reloadLog]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    return (
        <>
            <article>
                <span className={styles.orderB}>
                    <div className={styles.max}>
                        <div className={styles.ExHistorySet}>
                            <div className={styles.ExHistorySet__Radio}>
                                {/* <span className={styles.globalRadio_blue}>
                                    <input type="radio" id="ExHistory_openorder" name="ExHistory_radio"/>
                                    <label htmlFor="ExHistory_openorder">미체결</label>
                                </span>
                                <span className={styles.globalRadio_blue}>
                                    <input type="radio" id="ExHistory_completed" name="ExHistory_radio"/>
                                    <label htmlFor="ExHistory_completed">체결</label>
                                </span> */}
                            </div>
                            <div className={styles.ExHistorySet__Filter}>

                            </div>
                        </div>
                        <div className={styles.ExHistoryTable}>
                            <table>
                                <colgroup>
                                    <col width="150px" />
                                    <col width="90px" />
                                    <col width="70px" />
                                    <col />
                                    <col width="64px" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>주문일자</th>
                                        <th>종목명</th>
                                        <th>매수/매도</th>
                                        <th>주문총액</th>
                                        <th>주문가</th>
                                        <th>주문량</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className={styles.ExHistoryTable}>
                            <table>
                                <colgroup>
                                    <col width="150px" />
                                    <col width="90px" />
                                    <col width="70px" />
                                    <col />
                                    <col width="64px" />
                                </colgroup>
                                <tbody>
                                    {sessionId ? (
                                        logData.map((items, index) => (
                                            <tr key={index}>
                                                <td>{formatDate(items.trade_time)}</td>
                                                <td>{items.stock_code}</td>
                                                <td>{items.buy_or_sell}</td>
                                                <td>{items.order_price}</td>
                                                <td>{items.trade_price}</td>
                                                <td>{items.trade_quantity}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <div style={{    
                                            position: 'absolute',
                                            top: '250px',
                                            left: '36%'}}>
                                            로그인시 이용가능합니다.
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.ExHistoryTable}>
                        <table>
                            <colgroup>
                                <col width="150px" />
                                <col width="170px" />
                                <col width="100px" />
                                <col width="120px" />
                                <col />
                                <col width="64px" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>주문일자</th>
                                    <th>종목명</th>
                                    <th>매수/매도</th>
                                    <th>주문가</th>
                                    <th>주문총액</th>
                                    <th>주문량</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className={styles.ExHistoryTable}>
                        <table>
                            <colgroup>
                                <col width="150px" />
                                <col width="170px" />
                                <col width="80px" />
                                <col width="120px" />
                                <col />
                                <col width="64px" />
                            </colgroup>
                            <tbody>
                                {logData.map((items, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(items.trade_time)}</td>
                                        <td>{items.stock_code}</td>
                                        <td>{items.buy_or_sell}</td>
                                        <td>{items.trade_price}</td>
                                        <td>{items.order_price}</td>
                                        <td>{items.trade_quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </span>
            </article>
        </>
    );
}
