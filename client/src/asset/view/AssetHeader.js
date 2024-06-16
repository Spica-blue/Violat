import { NavLink } from 'react-router-dom';
import styles from '../css/AssetHeader.module.css';

export default function AssetHeader() {
    return (
        <>
            <div className={styles.sortTabMenuType02}>
                <div className={styles.tab__list}>
                    <div className={styles.tab__item}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tab__item__link + (isActive ? ` ${styles.tab__item__link__active}` : '')
                            }
                            title="보유자산"
                            to="/asset/balance"
                        >
                            보유자산
                        </NavLink>
                    </div>
                    <div className={styles.tab__item}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tab__item__link + (isActive ? ` ${styles.tab__item__link__active}` : '')
                            }
                            title="투자손익"
                            to="/asset/income"
                        >
                            투자손익
                        </NavLink>
                    </div>
                    <div className={styles.tab__item}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tab__item__link + (isActive ? ` ${styles.tab__item__link__active}` : '')
                            }
                            title="거래내역"
                            to="/asset/history"
                        >
                            거래내역
                        </NavLink>
                    </div>
                    {/* <div className={styles.tab__item}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tab__item__link + (isActive ? ` ${styles.tab__item__link__active}` : '')
                            }
                            title="미체결"
                            to="/investments/orders"
                        >
                            미체결
                        </NavLink>
                    </div>
                    <div className={styles.tab__item}>
                        <NavLink
                            className={({ isActive }) =>
                                styles.tab__item__link + (isActive ? ` ${styles.tab__item__link__active}` : '')
                            }
                            title="입출금대기"
                            to="/investments/wait"
                        >
                            입출금대기
                        </NavLink>
                    </div> */}
                </div>
            </div>
        </>
    );
}
