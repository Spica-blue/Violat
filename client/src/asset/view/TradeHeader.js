import { NavLink } from 'react-router-dom';
import styles from '../css/TradeHeader.module.css';

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
                            to="tradeBuy"
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
                            to="tradeSell"
                        >
                            매도
                        </NavLink>
                    </li>
                </ul>
            </span>
        </>
    );
}
