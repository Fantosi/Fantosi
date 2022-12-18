import { useParams } from "react-router-dom";
import { STATUS, UserInfo, VotingState, Web3Type } from "../types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "../css/TreasuryPage.css";
import { useEffect, useState } from "react";

interface TreasuryPageProps {
  user: UserInfo | undefined;
  signIn: () => Promise<void>;
}

const TreasuryPage = ({ user, signIn }: TreasuryPageProps) => {
  const dummyProps = {
    bnb: 300,
    totalCnt: 100,
    agree: 20,
    soso: 2,
    disagree: 10,
    desc: "뉴진스 데뷔 500일 기념! \n [역삼역 3번 출구] 지하철 광고",
    address: "0x7d61..55..cA98",
    status: STATUS.ACTIVE,
  };
  const status = dummyProps.status;
  const { treasuryId } = useParams();
  const [votingState, setVotingState] = useState<VotingState | undefined>(
    undefined
  );

  const renderStatusBox = () => {
    return (
      <div
        className={classNames("title_status", {
          active: status === STATUS.ACTIVE,
          executed: status === STATUS.EXECUTED,
          canceled: status === STATUS.CANCELED,
          defeated: status === STATUS.DEFEATED,
          queued: status === STATUS.QUEUED,
        })}
      >
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
    const [desc1, desc2] = dummyProps.desc.split("\n");
    return (
      <div className="left_contents_wrapper">
        <div>
          <div className="title_wrapper">
            <div className="title_txt">PROPOSAL</div>
            <div className="title_id">{treasuryId}</div>
            {renderStatusBox()}
          </div>
          <div className="bidding_desc">
            PROPOSAL 통과 시
            <div className="bidding_price">{`${dummyProps.bnb}BNB ($${
              dummyProps.bnb * 5
            })`}</div>
            가 배정됩니다.
          </div>
        </div>
        <div className="main_text">
          {desc1}
          <br />
          {desc2}
        </div>
        <div className="about_desc">
          DESCRIPTION 기능은 추후 제공될 예정입니다.
        </div>
      </div>
    );
  };

  const renderRightSideContent = () => {
    const { totalCnt, agree, soso, disagree, address } = dummyProps;
    return (
      <div className="right_contents_wrapper">
        <div className="voting_info_wrapper">
          <div className="voting_info_upperpart">
            <div>투표 성립 인원</div>
            <div className="voting_people_info">{`${
              agree + soso + disagree
            } / ${totalCnt} 명`}</div>
          </div>
          <div className="white_line" />
          <div className="voting_info_lowerpart">
            <div>투표 종료 시간</div>
            <div className="voting_info_date">
              12:00 AM KST <br /> December 12, 2022
            </div>
          </div>
          <div className="voting_proponent">
            {`팬토시 포토카드 보유자 ${
              address.slice(0, 6) + "..." + address.slice(-4)
            } 의 제안입니다.`}
          </div>
        </div>
        <div className="voting_btns">
          <div
            className={classNames("voting_btn agree", {
              selected: votingState === VotingState.AGREE,
            })}
            onClick={() => {
              if (votingState === VotingState.AGREE) setVotingState(undefined);
              else setVotingState(VotingState.AGREE);
            }}
          >
            <div className="voting_btn_wrapper">
              <div className="voting_icon" />
              <div>{"찬성해요 :)"}</div>
            </div>
            <div className="voting_cnt">{`${agree} 표`}</div>
          </div>
          <div
            className={classNames("voting_btn disagree", {
              selected: votingState === VotingState.DISAGREE,
            })}
            onClick={() => {
              if (votingState === VotingState.DISAGREE)
                setVotingState(undefined);
              else setVotingState(VotingState.DISAGREE);
            }}
          >
            <div className="voting_btn_wrapper">
              <div className="voting_icon" />
              <div>{"별로예요 :("}</div>
            </div>
            <div className="voting_cnt">{`${disagree} 표`}</div>
          </div>
          <div
            className={classNames("voting_btn soso", {
              selected: votingState === VotingState.SOSO,
            })}
            onClick={() => {
              if (votingState === VotingState.SOSO) setVotingState(undefined);
              else setVotingState(VotingState.SOSO);
            }}
          >
            <div className="voting_btn_wrapper">
              <div className="voting_icon" />
              <div>{"그저 그래요 :|"}</div>
            </div>
            <div className="voting_cnt">{`${soso} 표`}</div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (user === undefined) {
      signIn();
      return;
    } else {
      //   getArtistPhotoCardHistoryInfo();
    }
  }, [user]);

  return (
    <div className="treasurypage_wrapper">
      <Link className="link goback_btn_wrapper" to="/artist-page/NEWJEANS">
        <div className="goback_btn" />
        <div className="txt">PROPOSAL</div>
      </Link>
      <div className="main_contents_wrapper">
        {renderLeftSideContent()}
        {renderRightSideContent()}
      </div>
    </div>
  );
};

export default TreasuryPage;
