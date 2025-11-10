import styles from '../styles/Footer.module.css';
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleDivClick = (id) => {
    navigate('/view/FooterSub', { state: { id } });
  };

  return (
    <>
      <footer className={styles.css_jrmja5}>
        <div className={styles.css_g2chrv}>
          <div className={styles.css_0}>
            <a href="/">
              <div className={styles.h1}>VIOLAT</div>
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
              <span>고객센터 02) 3662-2707&nbsp;
                <span className={styles.css_12tddcg}>(평일 09:00~18:00/주말 및 공휴일 휴무)</span>
              </span>
              <span>금융사고 전담 콜센터 02-3660-0200&nbsp;
                <span className={styles.css_12tddcg}>(24시간 연중무휴)</span>
              </span>
            </p>
            <p className={styles.css_a91zhd}>
              <span>서울특별시 강서구 강서로 420 7층</span>
            </p>
            <p className={styles.css_hmehml}>
              <span>(재)서울호서직업전문학교 </span>
              <span>서울시 강서구 강서로 420 </span>
              <span>대표 최용규 </span>
              <span>사업자번호 109-82-06777</span>
            </p>
            <p className="seperatorWrapper css-1q1sl1a">
              <span>상가자산사업자 등록번호 2021-01 </span>
              <span>기사 배열 책임자 최용규 </span>
              <span>청소년 보호 책임자 최용규</span>
            </p>
            <p className={styles.css_usdif1}>Copyright 2017 - 2024 Dunamu Inc. All rights reserved.</p>
          </div>
          <div className={styles.css_ayj15i}>
            <div className={styles.css_0}>
              <h3 className={styles.css_1v9p6ny}>회사</h3>
              <br/>
              <ul>
                <li className={styles.css_l1ok}>
                  <div onClick={() => handleDivClick(1)}>조원소개</div>
                </li>
                <li className={styles.css_l1ok}>
                  <div onClick={() => handleDivClick(2)}>공지사항</div>
                </li>
              </ul>
            </div>
            <div className={styles.css_0}>
              <h3 className={styles.css_1v9p6ny}>고객지원</h3>
              <br/>
              <ul>
                <li className={styles.css_l1ok}>
                  <div onClick={() => handleDivClick(3)}>거래이용안내</div>
                </li>
                <li className={styles.css_l1ok}>
                  <div onClick={() => handleDivClick(4)}>입출금 이용 안내</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
