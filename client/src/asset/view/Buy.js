import styles from '../css/Buy.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Buy({ onTradeComplete }) {
    const { stockName } = useParams(); // useParams 훅으로 URL에서 stockName을 가져옴
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [stockCode, setStockCode] = useState(stockName);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [availableBalance, setAvailableBalance] = useState(0);
    const navigate = useNavigate();
    const sessionId = window.sessionStorage.getItem("sessionid");

    console.log("이름 가져옴?",stockName);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/asset/balance/', {
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
            if (data.length > 0) {
                setAvailableBalance(data[0].deposit); // Assuming there's at least one account and we're interested in the first one
            }
            console.log(data);
        });
    }, []);

    useEffect(() => {
        const qty = parseFloat(quantity) || 0;
        const prc = parseFloat(price) || 0;
        setTotalAmount((qty * prc));
    }, [quantity, price]);

    function buyStock(e) {
        e.preventDefault();
    
        if (!price || parseFloat(price) <= 0) {
            alert('매수가격은 0보다 커야 합니다.');
            return;
        }
    
        if (!quantity || parseFloat(quantity) <= 0) {
            alert('주문수량은 0보다 커야 합니다.');
            return;
        }
    
        if (parseFloat(totalAmount) > parseFloat(availableBalance)) {
            alert('주문 총액이 주문 가능 금액보다 많습니다.');
            return;
        }
    
        setIsLoading(true);
    
        const requestBody = {
            stock_code: stockCode,
            buy_or_sell: '매수',
            trade_quantity: quantity,
            trade_price: price,
            order_price: totalAmount,
            trade_time: '',
            account_num: data[0].account_num,
        };
    
        fetch('http://127.0.0.1:8000/asset/buyStock/', {
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
            console.log("매수 요청 성공:", data);
            alert("매수 완료되었습니다.")
            setIsLoading(false);
            setAvailableBalance(prevBalance => prevBalance - totalAmount);
            onTradeComplete(); // 매수 후 상위 컴포넌트에 알림
        })
        .catch(error => {
            console.error("매수 요청 실패:", error);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (stockName) {
            setStockCode(stockName); // Set the stock code when stockName changes
        }
    }, [stockName]);
    
    const handleClickBuy = () => {
        if (sessionId) {
          return;
        } else {
          alert("로그인시 이용가능합니다.");
          navigate('/member/Login');
        }
    }

    return (
        <>
            <article>
                <form onSubmit={buyStock}>
                    <div className={styles.css_1trmusf}>
                        <div className={styles.css_ofkx68}>
                            {data.map(item => (
                                <div className={styles.css_1baek4h} key={item.account_num}>
                                    <div className={styles.css_13ik8ss}>
                                        <div className={styles.css_0}>주문가능</div>
                                        <div className={styles.css_yiipgb}>
                                            <span className={styles.css_1go6adv}>{availableBalance}</span>
                                            <span className={styles.css_vzydk5}>KRW</span>
                                        </div>
                                    </div>
                                    <div className={styles.css_1eeh8ox}>
                                        <div className={styles.css_0}></div>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.css_ilfvon}>
                                <div className={styles.css_0}>매수가격 <span className={styles.css_1nodk1f}>(KRW)</span></div>
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
                                                <button type="button" title="-" onClick={() => setPrice(prev => Math.max(0, Number(prev) - 1000).toString())}> -
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className={styles.css_11uuyrb}>
                                                        <use href="#ic_calc_minus"></use>
                                                    </svg>
                                                </button>
                                                <button type="button" title="+" onClick={() => setPrice(prev => (Number(prev) + 1000).toString())}> +
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
                                    <div className={styles.css_0}>주문수량 <span className={styles.css_1culj3u}>(BTC)</span></div>
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
                                <div className={styles.css_0}>주문총액 <span className={styles.css_1culj3u}>(KRW)</span></div>
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
                                <button onClick={handleClickBuy} title="매수" className={styles.css_1xupxm10} disabled={isLoading}>
                                    {isLoading ? "진행중" : "매수"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </article>
        </>
    );
}
