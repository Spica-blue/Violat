import styles from '../css/Buy.module.css';
import { useEffect, useState } from 'react';
import TradeHeader from './TradeHeader';

export default function Sell() {
    const [isLoading, setIsLoading] = useState(false);
    const [stockCode, setStockCode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [availableSell, setAvailableSell] = useState(0);

    useEffect(() => {
        const requestBody = {
            stock_code: stockCode,
            account_num: "1111",
        };
        
        fetch('http://127.0.0.1:8000/asset/availSell/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.stock_quantity);
            setAvailableSell(data.stock_quantity);
            console.log(data);
        });
    }, [stockCode]); // stockCode가 변경될 때마다 availableSell을 업데이트

    useEffect(() => {
        const qty = parseFloat(quantity) || 0;
        const prc = parseFloat(price) || 0;
        setTotalAmount(qty * prc);
    }, [quantity, price]);

    function sellStock(e) {
        e.preventDefault();

        if (parseFloat(quantity) > parseFloat(availableSell)) {
            alert('주문 수량이 매도 가능 수량보다 많습니다.');
            return;
        }

        setIsLoading(true);

        const requestBody = {
            stock_code: stockCode,
            buy_or_sell: '매도',
            trade_quantity: quantity,
            trade_price: price,
            order_price: totalAmount,
            account_num: "1111",
        };

        fetch('http://127.0.0.1:8000/asset/sellStock/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log("매도 요청 성공:", data);
            // 매도 가능한 수량 업데이트
            setAvailableSell(prev => prev - parseFloat(quantity));
            setIsLoading(false);
        })
        .catch(error => {
            console.error("매도 요청 실패:", error);
            setIsLoading(false);
        });
    }

    return (
        <>
            <article>
                <TradeHeader/>
                <form onSubmit={sellStock}>
                    <div className={styles.css_1trmusf}>
                        <div className={styles.css_ofkx68}>
                            <div className={styles.css_1baek4h}>
                                <div className={styles.css_13ik8ss}>
                                    <div className={styles.css_0}>매도가능수량</div>
                                    <div className={styles.css_yiipgb}>
                                        <span className={styles.css_1go6adv}>{availableSell}</span>
                                        <span className={styles.css_vzydk5}>주</span>
                                    </div>
                                </div>
                                <div className={styles.css_1eeh8ox}>
                                    <div className={styles.css_0}></div>
                                </div>
                            </div>
                            <div className={styles.css_ilfvon}>
                                <div className={styles.css_0}>매도가격 <span className={styles.css_1nodk1f}>(KRW)</span></div>
                                <div className={styles.css_0}>
                                    <div className={styles.css_ihz6y5}>
                                        <div className={styles.css_xx6yfy}>
                                            <input
                                                type="text"
                                                className={styles.css_sw8u0u}
                                                placeholder='0'
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                            <div>
                                                <button type="button" title="-" onClick={() => setPrice(prev => Math.max(0, Number(prev) - 1000).toString())}>-
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className={styles.css_11uuyrb}>
                                                        <use href="#ic_calc_minus"></use>
                                                    </svg>
                                                </button>
                                                <button type="button" title="+" onClick={() => setPrice(prev => (Number(prev) + 1000).toString())}>+
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className={styles.css_11uuyrb}>
                                                        <use href="#ic_calc_plus"></use>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.css_1b0sg9n}>
                                <div className={styles.css_1usmpz}>
                                    <div className={styles.css_0}>주문수량 <span className={styles.css_1culj3u}></span></div>
                                    <div className={styles.css_ihz6y5}>
                                        <div className={styles.css_4mteuk}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                className={styles.css_sw8u0u}
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.css_1usmpz}>
                                    <div className={styles.css_0}></div>
                                    <div className={styles.css_0}>
                                        {/* <div className={styles.css_14elqql}>
                                            <Link data-text="10" data-id="0" className={styles.css_1hg8z9j}>10%</Link>
                                            <Link data-text="25" data-id="1" className={styles.css_1hg8z9j}>25%</Link>
                                            <Link data-text="50" data-id="2" className={styles.css_1hg8z9j}>50%</Link>
                                            <Link data-text="100" data-id="3" className={styles.css_1hg8z9j}>100%</Link>
                                            <Link className={styles.css_1c42ewl}>직접입력</Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.css_17qq1r}>
                                <div className={styles.css_0}>금액 <span className={styles.css_1culj3u}>(KRW)</span></div>
                                <div className={styles.css_ihz6y5}>
                                    <div className={styles.css_4mteuk}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className={styles.css_sw8u0u}
                                            value={totalAmount}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.css_w4zxyy}></div>
                        </div>
                        <div className={styles.css_1gf7e9w}>
                            <div className={styles.css_xsmrp6}>
                                <button title="초기화" className={styles.css_1xupxm9} onClick={() => { setStockCode(''); setQuantity(''); setPrice(''); setTotalAmount(''); }}>초기화</button>
                                <button title="매도" className={styles.css_1xupxm9} disabled={isLoading}>
                                    {isLoading ? "진행중" : "매도"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </article>
        </>
    );
}
