import styles from "../css/History.module.css";
import AssetHeader from "./AssetHeader";

export default function History() {

    return (
        <>
            <div className={styles.mainB} style={{margin: "0px auto"}}>
                <section className={styles.ty01}>
                    <article>
                    <AssetHeader/>
                        <div className={styles.MyTrade}>
                            <div className={styles.MyTrade__HistoryFilter}>
                                <div className={styles.HistoryFilter__layout}>
                                    <div className={styles.HistoryFilter__LayoutCell}>
                                        <div className={styles.HistoryFilter__category}>기간 <i className={styles.HistoryFilter__date}>2024.05.16 - 2024.06.15</i></div>
                                        <div className={styles.css_hc6lm9}>
                                            <ul className={styles.LineTab__TabList}>
                                                <div className={styles.css_71zpyy}>
                                                    <div className={styles.css_18huigl}>
                                                        <div className={styles.css_1639mhr}>1주일</div>
                                                        <div className={styles.css_1639mhr}>1개월</div>
                                                        <div className={styles.css_1639mhr}>3개월</div>
                                                        <div className={styles.css_1639mhr}>6개월</div>
                                                        <div className={styles.css_1639mhr}>직접입력</div>
                                                    </div>
                                                </div>
                                            </ul>
                                            <div className={styles.PureCalendar}>
                                                <div className={styles.PureCalendar__period}>
                                                    <i className={styles.PureCalendar__CalendarIcon}></i>
                                                    <a href="" className={styles.PureCalendar__date}>2024.05.16</a>
                                                    <i className={styles.PureCalendar__DateSpace}>-</i>
                                                    <a href="" className={styles.PureCalendar__date}>2024.06.15</a>
                                                </div>
                                                <div className={styles.PureCalendar__container}>

                                                </div>
                                                <div className={styles.PureCalendar__SubmitArea}>
                                                    <button className={styles.PureCalendar__submit}>조회</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.HistoryFilter__LayoutCell2}>
                                        <div className={styles.HistoryFilter__category}>종류</div>
                                        <div className={styles.LineTab}>
                                            <ul className={styles.LineTab__TabList}>
                                                <li className={styles.LineTab__TabItem}><button className={styles.LineTab__TabButton}>전체</button></li>
                                                <li className={styles.LineTab__TabItem}><button className={styles.LineTab__TabButton}>매수</button></li>
                                                <li className={styles.LineTab__TabItem}><button className={styles.LineTab__TabButton}>매도</button></li>
                                                <li className={styles.LineTab__TabItem}><button className={styles.LineTab__TabButton}>입금</button></li>
                                                <li className={styles.LineTab__TabItem}><button className={styles.LineTab__TabButton}>출금</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={styles.HistoryFilter__LayoutCell3}>
                                        <div className={styles.HistoryFilter__category}>코인선택</div>
                                        <div className={styles.SearchInput}>
                                            <input type="text" className={styles.FormBlock__InputText} placeholder="전체" value=""/>
                                            <button className={styles.SearchInput__SearchBtn}>찾기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.AmountTable}>
                                <table className={styles.AmountTable__HeadTable}>
                                    <colgroup>
                                        <col width="94"/>
                                        <col width="64"/>
                                        <col width="48"/>
                                        <col width="40"/>
                                        <col width="144"/>
                                        <col width="144"/>
                                        <col width="144"/>
                                        <col width="98"/>
                                        <col width="120"/>
                                        <col width="94"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className={styles.AmountTable__HeadTitle1}>체결시간</th>
                                            <th className={styles.AmountTable__HeadTitle}>코인</th>
                                            <th className={styles.AmountTable__HeadTitle}>마켓</th>
                                            <th className={styles.AmountTable__HeadTitle}>종류</th>
                                            <th className={styles.AmountTable__HeadTitle}>거래수량</th>
                                            <th className={styles.AmountTable__HeadTitle}>거래단가 
                                                <a href="" className={styles.tooltipDown}>
                                                    <div>입출금 내역의 거래단가는 입출금 시점의 시세를 반영해 계산합니다.</div>
                                                </a>
                                            </th>
                                            <th className={styles.AmountTable__HeadTitle}>거래금액</th>
                                            <th className={styles.AmountTable__HeadTitle}>수수료</th>
                                            <th className={styles.AmountTable__HeadTitle}>정산금액</th>
                                            <th className={styles.AmountTable__HeadTitle2}>주문시간</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div style={{
                                    height: "687px",
                                    overflow: "auto"
                                }}>
                                    <table className={styles.AmountTable__BodyTable}>
                                        <colgroup>
                                            <col width="94"/>
                                            <col width="64"/>
                                            <col width="48"/>
                                            <col width="40"/>
                                            <col width="144"/>
                                            <col width="144"/>
                                            <col width="144"/>
                                            <col width="98"/>
                                            <col width="120"/>
                                            <col width="94"/>
                                        </colgroup>
                                        <tbody>
                                            <tr className={styles.AmountTable__row}>
                                                <td className={styles.AmountTable__cell__EmptyData} colspan="10">검색결과가 없습니다.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </>
    );
}
