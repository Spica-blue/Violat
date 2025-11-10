import { Link } from "react-router-dom";
import styles from "../styles/Rankings.module.css";
import { useEffect, useState } from "react";

export default function Rankings() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/portfolio/rankings')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // 빈 배열로 설정하여 처음 렌더링될 때만 실행

    return (
        <>
            <div className={styles.mainB} style={{ margin: "0px auto" }}>
                <section className={styles.ty01}>
                    <article>
                        <div className={styles.csr86}>
                            <div>
                                <div className={styles.csr218}>
                                    <h1 className={styles.csr219}>주식순위</h1>
                                </div>
                                <div className={styles.csr221}>
                                    <div className={styles.csr97}>
                                        <div className={styles.tab_tabListWrap}>
                                            <div className={styles.tab_header}>
                                                <div className={styles.tab_nav_scroll}>
                                                    <div className={styles.tabs_nav}>
                                                        <div className={styles.tab_button_tabView}>Total Vol</div>
                                                        <div className={styles.tab_button_tabView}>Total OI</div>
                                                        <div className={styles.tab_button_tabView}>Volume</div>
                                                        <div className={styles.tab_button_tabView}>Turnover</div>
                                                        <div className={styles.tab_button_tabView}>Open Int</div>
                                                        <div className={styles.tab_button_tabView}>OI Increase</div>
                                                        <div className={styles.tab_button_tabView}>OI Decrease</div>
                                                        <div className={styles.tab_button_tabView}>Imp Volatility</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.tab_content}>
                                                <div className={styles.tab_pane_1}>
                                                    <div className={styles.tab_pane}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.csr316}>
                                <div className={styles.csr447}>
                                    <div className={styles.table_header_row}>
                                        <div className={styles.table_header_cell}>
                                            <span className={styles.table_header_cell_name} style={{
                                                flex: "0 0 28px",
                                                cursor: "default",
                                            }}>No.</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "0 0 170px",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>종목명</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>시가총액</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>검색률</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>현재가</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>변동가격</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>변동률</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>거래량</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>고가</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>저가</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                            flex: "1 1 0%",
                                            textAlign: "right",
                                            cursor: "default",
                                        }}>
                                            <span className={styles.table_header_cell_name}>PER</span>
                                        </div>
                                    </div>
                                    <div className={styles.table_body}>
                                        {data.map((item, index) => (
                                            <div key={index} className={styles.table_row}>
                                                <div className={styles.table_cell} style={{
                                                    flex: "0 0 28px",
                                                    cursor: "default",
                                                }}>
                                                    <span className={styles.csr427}>{index + 1}</span>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "0 0 170px",
                                                    cursor: "default",
                                                }}>
                                                    <div className={styles.csr423}>
                                                        <div className={styles.csr444}>
                                                            {/* <p className={styles.csr445} style={{
                                                                width: "26px",
                                                                height: "26px",
                                                                backgroundImage: "url(https://quotes-static.webullfintech.com/ticker-icon/913257561.png)",
                                                                boxShadow: "0px 0px 0px 1px #F3F6FA",
                                                                backgroundSize: "cover"
                                                            }}></p> */}
                                                        </div>
                                                        <div className={styles.detail}>
                                                            <Link to="https://www.webull.com/quote/nasdaq-nvda"></Link>
                                                            <p className={styles.tit}>{item.name}</p>
                                                            {/* <p className={styles.txt}>NVDA</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <div className={styles.csr437}>
                                                        <span className={styles.csr425}>{item.volume}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <div className={styles.csr437}>
                                                        <span className={styles.csr425}>{item.search_ratio}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>{item.current_price}</div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <div className={styles.csr437}>
                                                        <span className={styles.csr420} style={{
                                                            color: item.change.includes('상승') ? '#00C29B' : item.change.includes('하락') ? 'red' : '#00C29B'
                                                        }}>{item.change}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <span className={styles.csr420} style={{
                                                        color: item.change_percentage.startsWith('+') ? '#00C29B' : item.change_percentage.startsWith('-') ? 'red' : '#00C29B'  
                                                    }}>{item.change_percentage}</span>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <span className={styles.csr425}>{item.trade_amount}</span>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <div>
                                                        <span className={styles.csr425}>{item.high_price}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <div>
                                                        <span className={styles.csr425}>{item.low_price}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.table_cell} style={{
                                                    flex: "1 1 0%",
                                                    textAlign: "right",
                                                }}>
                                                    <div>
                                                        <span className={styles.csr425}>{item.per}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </>
    );
}
