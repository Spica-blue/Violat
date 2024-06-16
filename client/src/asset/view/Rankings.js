import { Link } from "react-router-dom";
import styles from "../css/Rankings.module.css";

export default function Rankings() {

    return (
        <>
            <div className={styles.mainB} style={{margin: "0px auto"}}>
                <section className={styles.ty01}>
                    <article>
                        <div className={styles.sortTabMenuType02}>
                            <div className={styles.tab__list}>
                                <div className={styles.tab__item}>
                                    <Link className={styles.tab__item__link__active} title="보유자산" to="/investments/balance">보유자산</Link>
                                </div>
                                <div className={styles.tab__item}>
                                    <Link className={styles.tab__item__link} title="투자손익" to="/investments/income">투자손익</Link>
                                </div>
                                <div className={styles.tab__item}>
                                    <Link className={styles.tab__item__link} title="거래내역" to="/investments/history">거래내역</Link>
                                </div>
                                <div className={styles.tab__item}>
                                    <Link className={styles.tab__item__link} title="미체결" to="/investments/orders">미체결</Link>
                                </div>
                                <div className={styles.tab__item}>
                                    <Link className={styles.tab__item__link} title="입출금대기" to="/investments/wait">입출금대기</Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.csr86}>
                            <div>
                                <div className={styles.csr218}>
                                    <h1 className={styles.csr219}>Top Options</h1>
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
                                                flex: "0 0 285px",
                                                cursor: "default",
                                            }}>
                                            <span className={styles.table_header_cell_name}>Symbol/Name</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                                cursor: "default",
                                            }}>
                                            <span className={styles.table_header_cell_name}>Total Volume</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                                cursor: "default",
                                            }}>
                                            <span className={styles.table_header_cell_name}>P/C Volume Ratio</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                                cursor: "default",
                                            }}>
                                            <span className={styles.table_header_cell_name}>Total Position</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                                cursor: "default",
                                            }}>
                                            <span className={styles.table_header_cell_name}>P/C Open Int Ratio</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                                cursor: "default",
                                            }}>
                                            <span className={styles.table_header_cell_name}>Underlying Price</span>
                                        </div>
                                        <div className={styles.table_header_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                                cursor: "default",
                                            }}>
                                            <span className={styles.table_header_cell_name}>Underlying Change%</span>
                                        </div>
                                    </div>
                                    <div className={styles.table_body}>
                                        <div className={styles.table_row}>
                                            <div className={styles.table_cell} style={{
                                                flex: "0 0 28px",
                                                cursor: "default",
                                            }}>
                                                <span className={styles.csr427}>1</span>
                                            </div>
                                            <div className={styles.table_cell} style={{
                                                flex: "0 0 285px",
                                                cursor: "default",
                                            }}>
                                                <div className={styles.csr423}>
                                                    <div className={styles.csr444}>
                                                        <p className={styles.csr445} style={{
                                                            width: "26px",
                                                            height: "26px",
                                                            backgroundImage: "url(https://quotes-static.webullfintech.com/ticker-icon/913257561.png)",
                                                            boxShadow: "0px 0px 0px 1px #F3F6FA",
                                                            backgroundSize: "cover"
                                                        }}></p>
                                                    </div>
                                                    <div className={styles.detail}>
                                                        <a href="https://www.webull.com/quote/nasdaq-nvda"></a>
                                                        <p className={styles.tit}>Nvidia Corporation</p>
                                                        <p className={styles.txt}>NVDA</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.table_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                            }}>
                                                <div className={styles.csr437}>
                                                    <span className={styles.csr425}>7.96M</span>
                                                </div>
                                            </div>
                                            <div className={styles.table_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                            }}>0.64</div>
                                            <div className={styles.table_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                            }}>
                                                <div className={styles.csr437}>
                                                    <span className={styles.csr425}>28.65M</span>
                                                </div>
                                            </div>
                                            <div className={styles.table_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                            }}>0.73</div>
                                            <div className={styles.table_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                            }}>
                                                <span className={styles.csr420}>131.88</span>
                                            </div>
                                            <div className={styles.table_cell} style={{
                                                flex: "1 1 0%",
                                                textAlign: "right",
                                            }}>
                                                <div>
                                                    <span className={styles.csr420}>+1.75%</span>
                                                </div>
                                            </div>
                                        </div>
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
