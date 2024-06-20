import { Link } from "react-router-dom";
import styles from "../css/Balance.module.css";
import AssetHeader from "./AssetHeader";
import { useEffect, useState } from "react";

export default function Balance() {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/asset/balance')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setData(data);
            console.log(data);
        })
    }, [])

    return (
        <>
            <div className={styles.mainB} style={{margin: "0px auto"}}>
                <section className={styles.ty01}>
                    <article>
                        <AssetHeader/>
                        <div className={styles.MyTrade}>
                            {data.map(item => (
                                <div className={styles.MyTrade__TradeState} key={item.account_num}>
                                    <div className={styles.TradeState__section__amount}>
                                        <div className={styles.TradeAmount}>
                                            <dl className={styles.TradeAmount__row__total}>
                                                <dt className={styles.TradeAmount__TitleCell}>
                                                    <span className={styles.TradeAmount__title}>보유 KRW</span>
                                                </dt>
                                                <dd className={styles.TradeAmount__CountCell}>
                                                    <span className={styles.TradeAmount__count}>
                                                        {item.deposit}<i className={styles.TradeAmount__unit}>KRW</i>
                                                    </span>
                                                </dd>
                                            </dl>
                                            <dl className={styles.TradeAmount__row__total}>
                                                <dt className={styles.TradeAmount__TitleCell}>
                                                    <span className={styles.TradeAmount__title}>설정한도</span>
                                                </dt>
                                                <dd className={styles.TradeAmount__CountCell}>
                                                    <span className={styles.TradeAmount__count}>{item.deposit_limit}<i className={styles.TradeAmount__unit}>KRW</i></span>
                                                </dd>
                                            </dl>

                                            <dl className={styles.TradeAmount__row}>
                                                <dt className={styles.TradeAmount__TitleCell}>
                                                    <span className={styles.TradeAmount__title}>총 매수</span>
                                                </dt>
                                                <dd className={styles.TradeAmount__CountCell}>
                                                    <span className={styles.TradeAmount__count}>0<i className={styles.TradeAmount__unit}>KRW</i></span>
                                                </dd>
                                            </dl>

                                            <dl className={styles.TradeAmount__row}>
                                                <dt className={styles.TradeAmount__TitleCell}>
                                                    <span className={styles.TradeAmount__title}>총평가손익</span>
                                                </dt>
                                                <dd className={styles.TradeAmount__CountCell}>
                                                    <span className={styles.TradeAmount__count}>-<i className={styles.TradeAmount__unit}>KRW</i></span>
                                                </dd>
                                            </dl>

                                            <dl className={styles.TradeAmount__row}>
                                                <dt className={styles.TradeAmount__TitleCell}>
                                                    <span className={styles.TradeAmount__title}>총 평가</span>
                                                </dt>
                                                <dd className={styles.TradeAmount__CountCell}>
                                                    <span className={styles.TradeAmount__count}>-<i className={styles.TradeAmount__unit}>KRW</i></span>
                                                </dd>
                                            </dl>

                                            <dl className={styles.TradeAmount__row}>
                                                <dt className={styles.TradeAmount__TitleCell}>
                                                    <span className={styles.TradeAmount__title}>총평가수익률</span>
                                                </dt>
                                                <dd className={styles.TradeAmount__CountCell}>
                                                    <span className={styles.TradeAmount__count}>-<i className={styles.TradeAmount__unit}>%</i></span>
                                                </dd>
                                            </dl>

                                            <dl className={styles.TradeAmount__row}>
                                                <dt className={styles.TradeAmount__TitleCell}>
                                                    <span className={styles.TradeAmount__title}>주문가능</span>
                                                </dt>
                                                <dd className={styles.TradeAmount__CountCell}>
                                                    <span className={styles.TradeAmount__count}>0<i className={styles.TradeAmount__unit}>KRW</i></span>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className={styles.TradeState__section_graph}>
                                        <div className={styles.TradeGraph}>
                                            <div className={styles.TradeGraph__EmptyText}>보유자산 비중 그래프가 제공됩니다.</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.AmontTable}>
                                <div className={styles.AmountTable__Header}>
                                    <h5 className={styles.AmountTable__title}>보유자산 목록</h5>
                                    {/* <div className={styles.AmountTable__option}><span class={styles.chkB}><a href="#" class="">checkbox</a><label class="chkB__label" for="">거래미지원/소액 자산 숨기기 <em class="chkB__subTxt">(평가금액 1만원 미만)</em></label></span></div> */}
                                </div>
                                <table className={styles.AmountTable__HeadTable}>
                                    <colgroup>
                                        <col width="*"/>
                                        <col width="140"/>
                                        <col width="140"/>
                                        <col width="140"/>
                                        <col width="140"/>
                                        <col width="135"/>
                                        <col width="100"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>보유자산</th>
                                            <th>보유수량</th>
                                            <th className={styles.AmountTable__HeadTitle}>
                                                <Link to="#">매수평균가 <img src="https://cdn.upbit.com/upbit-web/images/ico_sort.52f3f4e.png" alt=""/></Link>
                                            </th>
                                            <th className={styles.AmountTable__HeadTitle}>
                                                <Link to="#">매수금액 <img src="https://cdn.upbit.com/upbit-web/images/ico_sort.52f3f4e.png" alt=""/></Link>
                                            </th>
                                            <th className={styles.AmountTable__HeadTitle}>
                                                <Link to="#" className={styles.selected}>평가금액 <img src="https://cdn.upbit.com/upbit-web/images/ico_sort.52f3f4e.png" alt=""/></Link>
                                            </th>
                                            <th className={styles.AmountTable__HeadTitle}>
                                                <Link to="#">평가손익(%) <img src="https://cdn.upbit.com/upbit-web/images/ico_sort.52f3f4e.png" alt=""/></Link>
                                            </th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {exampleData.map((item, index) => (
                                            <tr key={index}>
                                                <td style={{textAlign: 'center'}}>{item.asset}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.averagePrice}</td>
                                                <td>{item.purchaseAmount}</td>
                                                <td>{item.evaluationAmount}</td>
                                                <td>{item.evaluationProfit}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        ))} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </article>
                </section>
                <section className={styles.ty02}>

                </section>
            </div>
        </>
    );
}
