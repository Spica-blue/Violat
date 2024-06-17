import styles from '../css/Footer.module.css';
// import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <>
            <footer className={styles.css_jrmja5}>
                <div className={styles.css_g2chrv}>
                    <div className={styles.css_0}>
                        <a href="/">
                            <img alt="upbit_logo" src="https://cdn.upbit.com/upbit-web/images/upbit_logo.35a5b2a.svg" width="80" height="18"/>
                        </a>
                        <div className={styles.css_hc6lm9}>
                            <div className={styles.css_yfhrnm}>
                                <span className={styles.css_1vr1881}>Korea, South</span>
                                <div className={styles.css_pcl2dd}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" className={styles.css_l05q21}>
                                        <use href="#arrow-reply-down"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.css_15cptx8}>
                        <p className={styles.css_13k272v}>
                            <span>고객센터 1588-5682&nbsp;
                                <span className={styles.css_12tddcg}>(평일 09:00~18:00/주말 및 공휴일 휴무)</span>
                            </span>
                            <span>금융사고 전담 콜센터 1533-1111&nbsp;
                                <span className={styles.css_12tddcg}>(24시간 연중무휴)</span>
                            </span>
                        </p>
                        <p className={styles.css_a91zhd}>
                            <span>서울특별시 강남구 테헤란로4길 14, 2층</span>
                        </p>
                        <p className={styles.css_hmehml}>
                            <span>두나무 (주)</span>
                            <span>서울특별시 서초구 강남대로 369, 15층</span>
                            <span>대표 이석우</span>
                            <span>사업자등록번호 119-86-54968</span>
                        </p>
                        <p className="seperatorWrapper css-1q1sl1a">
                            <span>가상자산사업자 등록번호 2021-01</span>
                            <span>기사 배열 책임자 김태웅</span>
                            <span>청소년 보호 책임자 임종헌</span>
                        </p>
                        <p className={styles.css_usdif1}>Copyright 2017 - 2024 Dunamu Inc. All rights reserved.</p>
                    </div>
                    <div className={styles.css_ayj15i}>
                        <div className={styles.css_0}>
                            <h3 className={styles.css_1v9p6ny}>회사</h3>
                            <ul>
                                <li className={styles.css_l1ok}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://dunamu.com">회사소개</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/service_center/notice">공지사항</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/terms_of_service">이용약관</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/open_api_agreement">Open API 이용약관</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/privacy_policy">
                                        <span className={styles.css_ffkz39}>개인정보처리방침</span>
                                    </a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/youth_policy">청소년보호정책</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://upbitcare.com/">투자자보호센터</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://bugbounty.upbit.com/">버그바운티 프로그램</a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.css_0}>
                            <h3 className={styles.css_1v9p6ny}>고객지원</h3>
                            <ul>
                                <li className={styles.css_l1ok}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://upbitcs.zendesk.com/hc/ko">자주하는 질문 FAQ</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://static.upbit.com/common/bzc_kakao.html">카카오톡 문의 (24시간)</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/service_center/qna">1:1 문의하기</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/service_center/open_api_guide">Open API</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://upbitcs.zendesk.com/hc/ko/articles/4403838454809-%EA%B1%B0%EB%9E%98-%EC%9D%B4%EC%9A%A9-%EC%95%88%EB%82%B4">거래 이용 안내</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/service_center/guide">입출금 이용 안내</a>
                                </li>
                                <li className={styles.css_l1ok}>
                                    <a href="/service_center/listing_guide">거래지원 문의 및 제보 (Market Support)</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}