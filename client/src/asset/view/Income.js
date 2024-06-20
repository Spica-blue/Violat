import { Link } from "react-router-dom";
import styles from "../css/Income.module.css";
import AssetHeader from "./AssetHeader";

export default function Income() {

    return (
        <>
            <div className={styles.mainB} style={{margin: "0px auto"}}>
                <section className={styles.ty01}>
                    <article>
                        <AssetHeader/>
                        <div className={styles.investments}>
                            <div className={styles.investments__information}>
                                <div className={styles.information}>
                                    <div className={styles.css_zd9pbh}>
                                        <div className={styles.infomation__cell}>
                                            <div className={styles.css_1venuyz}>
                                                <div className={styles.css_18huigl}>
                                                    <div className={styles.css_1639mhr}>금액가중수익률</div>
                                                    <div className={styles.css_1639mhr}>시간가중수익률</div>
                                                    <div className={styles.css_1639mhr}>단순수익률</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.infomation__cell}>
                                            <div className={styles.css_bqbxz5}>
                                                <div className={styles.css_18huigl}>
                                                    <div className={styles.css_1639mhr}>월별</div>
                                                    <div className={styles.css_1639mhr}>연도별</div>
                                                </div>
                                            </div>
                                            <div className={styles.css_0}>
                                                <div tabindex="-1" className={styles.css_1x6qg29}>
                                                    <div className={styles.css_1f136nj}>
                                                        <div className={styles.css_1d3w5wq}>2024년 6월</div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" className={styles.css_1cq4azn}>
                                                            <use href="#arrow-reply-down"></use>
                                                        </svg>
                                                    </div>
                                                    <div className={styles.css_a9xi8g}>
                                                        <ul className={styles.css_q6egz5}>
                                                            <li className={styles.css_puoh2} role="button" data-selected="false" name="2024년 6월">2024년 6월</li>
                                                            <li className={styles.css_16t0r59} role="button" data-selected="false" name="2024년 5월">2024년 5월</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.css_1xt3duq}>2024년 06월 01일 ~ 2024년 06월 14일의 투자손익
                                        <Link to="" className={styles.defaultTooltip}>
                                            <div className={styles.css_g4uurh}>
                                                <img src="https://static.upbit.com/guide/ko/pnl_guide_1_pc.png" alt="" width="100%"/>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={styles.infomation__state}>
                                        <div className={styles.state__cell}>
                                            <div className={styles.state__label}>기간 누적 손익</div>
                                            <div className={styles.state__value}>
                                                <div className={styles.state__score}>0</div>
                                                <span className={styles.state__unit}>KRW</span>
                                            </div>
                                        </div>
                                        <div className={styles.state__cell}>
                                            <div className={styles.state__label}>기간 누적 수익률</div>
                                            <div className={styles.state__value}>
                                                <div className={styles.state__score}>0.00</div>
                                                <span className={styles.state__unit}>%</span>
                                            </div>
                                        </div>
                                        <div className={styles.state__cell}>
                                            <div className={styles.state__label}>기간 평균 투자금액</div>
                                            <div className={styles.state__value}>
                                                <div className={styles.state__score}>0</div>
                                                <span className={styles.state__unit}>KRW</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.investments__stateChart}>
                                <div className={styles.stateChart__header}>
                                    <div className={styles.stateChart__title}>투자손익 그래프</div>
                                    <button className={styles.stateChart__button}>그래프 접기/펼치기 버튼</button>
                                </div>
                            </div>
                            <div className={styles.stateChart__content}>
                                <div className={styles.stateChart__wrap}>
                                    <div className={styles.stateChart__content__header}>누적 수익률</div>
                                    <div className={styles.stateChart__content__unit}>단위: %</div>
                                    <div className={styles.stateChart__content__chartArea}>
                                        <div className={styles.highstock} style={{overflow: "hidden"}}>
                                            <div className={styles.highcharts__container}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.stateChart__wrap}>
                                    <div className={styles.stateChart__content__header}>손익</div>
                                    <div className={styles.stateChart__content__chartArea}>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className={styles.stateTable__header}>
                                <div className={styles.css_1u37vek}>투자손익 상세</div>
                                <div className={styles.statTable__desc}>KRW 환산 추정값
                                    <Link to="" className={styles.defaultTooltip}>
                                        <div className={styles.tooltipContent}>
                                            <img src="https://static.upbit.com/guide/ko/pnl_guide_2_pc.png" alt="" width="100%"/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.stateTable__tableHead}>
                                <table className={styles.css_vaymnb}>
                                    <colgroup>
                                        <col width="69.5px"/>
                                        <col width="119px"/>
                                        <col width="99px"/>
                                        <col width="119px"/>
                                        <col width="99px"/>
                                        <col width="129px"/>
                                        <col width="129px"/>
                                        <col width="109px"/>
                                        <col width="117.5px"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>
                                                <Link to="">일자<i className={styles.ico__array}></i></Link>
                                            </th>
                                            <th>일일 손익</th>
                                            <th>일일 수익률</th>
                                            <th>누적 손익</th>
                                            <th>누적 수익률</th>
                                            <th>기초 자산</th>
                                            <th>기말 자산</th>
                                            <th>입금</th>
                                            <th>출금</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className={styles.stateTable__tableBody}>
                                <div style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        width: "100%", 
                                        height: "100%"
                                    }}>
                                    <div style={{
                                        position: "absolute", 
                                        inset: "0px",
                                        overflow: "scroll",
                                        margin: "-17px 0",
                                    }}>
                                        <table className={styles.css_vaymnb}>
                                            <colgroup>
                                                <col width="69.5px"/>
                                                <col width="119px"/>
                                                <col width="99px"/>
                                                <col width="119px"/>
                                                <col width="99px"/>
                                                <col width="129px"/>
                                                <col width="129px"/>
                                                <col width="109px"/>
                                                <col width="117.5px"/>
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.14</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.13</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>06.12</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td class="">0</td>
                                                    <td class="">0.00%</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div style="position: absolute; height: 6px; right: 2px; bottom: 2px; left: 2px; border-radius: 3px;">
                                        <div style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); width: 0px;">
                                        </div>
                                    </div>
                                    <div style="position: absolute; width: 6px; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;">
                                        <div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 167px; transform: translateY(129px);">
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                        </div>
                    </article>
                </section>

            </div>
        </>
    );
}
