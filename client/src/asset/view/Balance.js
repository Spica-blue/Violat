import { Link } from "react-router-dom";
import styles from "../css/Balance.module.css";
import AssetHeader from "./AssetHeader";
import { useEffect, useState } from "react";
// import AssetDistribution from "./AssetDistribution";

export default function Balance() {
    const [data, setData] = useState({});
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        fetch('http://127.0.0.1:8000/asset/balance')
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data);
            });
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/asset/detailBalance/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account_num: "1111" })
            })
            .then(res => res.json())
            .then(data => {
                setDetailData(data);
                console.log(data);
            });
    }, []);

    return (
        <>
            <div className={styles.mainB} style={{margin: "0px auto"}}>
                <section className={styles.ty01}>
                    <article>
                        <AssetHeader/>
                        <div className={styles.MyTrade}>
                            <div className={styles.MyTrade__TradeState}>
                                <div className={styles.TradeState__section__amount}>
                                    <div className={styles.TradeAmount}>
                                        <dl className={styles.TradeAmount__row__total}>
                                            <dt className={styles.TradeAmount__TitleCell}>
                                                <span className={styles.TradeAmount__title}>보유 KRW</span>
                                            </dt>
                                            <dd className={styles.TradeAmount__CountCell}>
                                                <span className={styles.TradeAmount__count}>
                                                    {data.deposit}<i className={styles.TradeAmount__unit}>KRW</i>
                                                </span>
                                            </dd>
                                        </dl>
                                        <dl className={styles.TradeAmount__row__total}>
                                            <dt className={styles.TradeAmount__TitleCell}>
                                                <span className={styles.TradeAmount__title}>설정한도</span>
                                            </dt>
                                            <dd className={styles.TradeAmount__CountCell}>
                                                <span className={styles.TradeAmount__count}>{detailData.deposit_limit}<i className={styles.TradeAmount__unit}>KRW</i></span>
                                            </dd>
                                        </dl>

                                        <dl className={styles.TradeAmount__row}>
                                            <dt className={styles.TradeAmount__TitleCell}>
                                                <span className={styles.TradeAmount__title}>총 매수</span>
                                            </dt>
                                            <dd className={styles.TradeAmount__CountCell}>
                                                <span className={styles.TradeAmount__count}>{detailData.total_buy}<i className={styles.TradeAmount__unit}>KRW</i></span>
                                            </dd>
                                        </dl>

                                        <dl className={styles.TradeAmount__row}>
                                            <dt className={styles.TradeAmount__TitleCell}>
                                                <span className={styles.TradeAmount__title}>총평가손익</span>
                                            </dt>
                                            <dd className={styles.TradeAmount__CountCell}>
                                                <span className={styles.TradeAmount__count}>{detailData.total_profit_loss}<i className={styles.TradeAmount__unit}>KRW</i></span>
                                            </dd>
                                        </dl>

                                        <dl className={styles.TradeAmount__row}>
                                            <dt className={styles.TradeAmount__TitleCell}>
                                                <span className={styles.TradeAmount__title}>총 평가</span>
                                            </dt>
                                            <dd className={styles.TradeAmount__CountCell}>
                                                <span className={styles.TradeAmount__count}>{detailData.total_eval}<i className={styles.TradeAmount__unit}>KRW</i></span>
                                            </dd>
                                        </dl>

                                        <dl className={styles.TradeAmount__row}>
                                            <dt className={styles.TradeAmount__TitleCell}>
                                                <span className={styles.TradeAmount__title}>총평가수익률</span>
                                            </dt>
                                            <dd className={styles.TradeAmount__CountCell}>
                                                <span className={styles.TradeAmount__count}>{detailData.total_profit_loss_rate}<i className={styles.TradeAmount__unit}>%</i></span>
                                            </dd>
                                        </dl>

                                        <dl className={styles.TradeAmount__row}>
                                            <dt className={styles.TradeAmount__TitleCell}>
                                                <span className={styles.TradeAmount__title}>주문가능</span>
                                            </dt>
                                            <dd className={styles.TradeAmount__CountCell}>
                                                <span className={styles.TradeAmount__count}>{detailData.deposit}<i className={styles.TradeAmount__unit}>KRW</i></span>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className={styles.TradeState__section_graph}>
                                    <div className={styles.TradeGraph}>
                                        <div className={styles.TradeGraph__EmptyText}>보유자산 비중 그래프가 제공됩니다.</div>
                                        {/* <AssetDistribution accountNum="1111" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.AmontTable}>
                                <div className={styles.AmountTable__Header}>
                                    <h5 className={styles.AmountTable__title}>보유자산 목록</h5>
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
                                        {/* 데이터를 여기에 추가하세요 */}
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
