import { NavLink } from 'react-router-dom';
import styles from '../css/Buy.module.css';

export default function TradeHeader() {
    return (
        <>
            <span className={styles.tabB}>
                <ul className={styles.top}>
                    <li className={styles.tabB__buy}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tabB__button + (isActive ? ` ${styles.tabB__button__active}` : '')
                            }
                            title="매수"
                            to="/asset/buy"
                        >
                            매수
                        </NavLink>
                    </li>
                    <li className={styles.tabB__sell}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tabB__button + (isActive ? ` ${styles.tabB__button__active}` : '')
                            }
                            title="매도"
                            to="/asset/sell"
                        >
                            매도
                        </NavLink>
                    </li>
                    <li className={styles.tabB__history}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tabB__button + (isActive ? ` ${styles.tabB__button__active}` : '')
                            }
                            title="거래내역"
                            to="/asset/tradeLog"
                        >
                            거래내역
                        </NavLink>
                    </li>
                </ul>
            </span>
        </>
    );
}
