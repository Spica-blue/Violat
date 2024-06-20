import styles from '../css/TradeHeader.module.css';

export default function TradeHeader({ setActiveTab, activeTab }) {
    return (
        <>
            <span className={styles.tabB}>
                <ul className={styles.top}>
                    <li className={styles.tabB__buy}>
                        <button
                            className={activeTab === "buy" ? styles.activeBuy : ""}
                            onClick={() => setActiveTab("buy")}
                        >
                            매수
                        </button>
                    </li>
                    <li className={styles.tabB__sell}>
                        <button
                             className={activeTab === "sell" ? styles.activeSell : ""}
                             onClick={() => setActiveTab("sell")}
                        >
                            매도
                        </button>
                    </li>
                </ul>
            </span>
        </>
    );
}
