import { useParams } from "react-router-dom";
import { STATUS, UserInfo, Web3Type } from "../types";
import "../css/TreasuryPage.css";

interface TreasuryPageProps {
  user: UserInfo | undefined;
  signIn: () => Promise<void>;
}

const TreasuryPage = (props: TreasuryPageProps) => {
  const dummyProps = {
    bnb: 300,
    totalCnt: 100,
    agree: 23,
    soso: 23,
    disagree: 23,
    desc: "뉴진스 데뷔 500일 기념! \n [역삼역 3번 출구] 지하철 광고",
    address: "0x7d61...cA98",
    status: STATUS.ACTIVE,
  };
  const status = dummyProps.status;
  const { treasuryId } = useParams();

  const renderStatusBox = () => {
    return (
      <div className="title_status">
        {status === STATUS.ACTIVE ? (
          <div>{status}</div>
        ) : status === STATUS.EXECUTED ? (
          <div>{status}</div>
        ) : status === STATUS.CANCELED ? (
          <div>{status}</div>
        ) : status === STATUS.DEFEATED ? (
          <div>{status}</div>
        ) : status === STATUS.QUEUED ? (
          <div>{status}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const renderLeftSideContent = () => {
    return (
      <div className="left_contents_wrapper">
        <div className="title_wrapper">
          <div className="title">PROPOSAL</div>
          <div className="title_id">{treasuryId}</div>
          {renderStatusBox()}
        </div>
        <div className="bidding_desc">
          PROPOSAL 통과 시
          <div>{`${dummyProps.bnb}BNB ($${dummyProps.bnb * 5})`}</div>가
          배정됩니다.
        </div>
        <div className="about_desc">
          DESCRIPTION 기능은 추후 제공될 예정입니다.
        </div>
        <div className="main_text">{dummyProps.desc}</div>
      </div>
    );
  };

  const renderRightSideContent = () => {
    return <div className="right_contents_wrapper"></div>;
  };

  return (
    <div className="treasurypage_wrapper">
      <div className="goback_btn_wrapper">
        <div className="goback_btn" />
        <div className="txt">PROPOSAL</div>
      </div>
      <div className="main_contents_wrapper">
        {renderLeftSideContent()}
        {renderRightSideContent()}
      </div>
    </div>
  );
};

export default TreasuryPage;
