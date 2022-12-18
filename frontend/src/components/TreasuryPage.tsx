import { useParams } from "react-router-dom";
import {
  ProposalInfo,
  STATUS,
  UserInfo,
  VoteKind,
  VotingState,
  Web3Type,
} from "../types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "../css/TreasuryPage.css";
import { useEffect, useState } from "react";
import { dummyProposals } from "../utils/dummyData";
import LoadingModal from "./LoadingModal";
import DeniedToast from "./DeniedToast";
import FinishedToast from "./FinishedToast";

interface TreasuryPageProps {
  web3: Web3Type;
  user: UserInfo | undefined;
  signIn: () => Promise<void>;
}

const TreasuryPage = ({ web3, user, signIn }: TreasuryPageProps) => {
  const { treasuryId } = useParams();
  const [votingState, setVotingState] = useState<VotingState | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proposal, setProposal] = useState<ProposalInfo | undefined>(undefined);
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const closeDeniedToast = () => {
    setIsDenied(false);
  };
  const closeFinishedToast = () => {
    setIsFinished(false);
  };

  const renderStatusBox = () => {
    if (proposal === undefined) {
      return <div className="title_status"></div>;
    }
    const { state } = proposal;
    return (
      <div
        className={classNames("title_status", {
          active: state === STATUS.ACTIVE,
          executed: state === STATUS.EXECUTED,
          canceled: state === STATUS.CANCELED,
          defeated: state === STATUS.DEFEATED,
          queued: state === STATUS.QUEUED,
        })}
      >
        {state === STATUS.ACTIVE ? (
          <div>{state}</div>
        ) : state === STATUS.EXECUTED ? (
          <div>{state}</div>
        ) : state === STATUS.CANCELED ? (
          <div>{state}</div>
        ) : state === STATUS.DEFEATED ? (
          <div>{state}</div>
        ) : state === STATUS.QUEUED ? (
          <div>{state}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const renderLeftSideContent = () => {
    if (proposal === undefined) {
      return <div className="title_status"></div>;
    }
    const [desc1, desc2] = proposal.description.split("\n");
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
            <div className="bidding_price">{`${Number(
              proposal.sendValues[0]
            )}BNB ($${Number(proposal.sendValues[0]) * 5})`}</div>
            가 배정됩니다.
          </div>
        </div>
        <div className="main_text">
          {desc1}
          <br />
          {desc2 ? desc2 : ""}
        </div>
        <div className="about_desc">
          DESCRIPTION 기능은 추후 제공될 예정입니다.
        </div>
      </div>
    );
  };

  const renderRightSideContent = () => {
    if (proposal === undefined)
      return <div className="right_contents_wrapper"></div>;
    const { againstVotes, abstainVotes, forVotes, proposer } = proposal;

    const quorumVotes =
      Number(proposal.quorumVotes) === 0 ? 26 : proposal.quorumVotes;

    const agree = Number(forVotes);
    const soso = Number(abstainVotes);
    const disagree = Number(againstVotes);

    return (
      <div className="right_contents_wrapper">
        <div className="voting_info_wrapper">
          <div className="voting_info_upperpart">
            <div>투표 성립 인원</div>
            <div className="voting_people_info">{`${
              agree + soso + disagree
            } / ${quorumVotes} 명`}</div>
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
              proposer.slice(0, 6) + "..." + proposer.slice(-4)
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

  const getArtistAllProposalInfo = async () => {
    const proposals = await web3.getArtistAllProposalInfo("NEWJEANS");
    let flag = false;
    [...proposals, ...dummyProposals].forEach((proposal) => {
      if (!flag && treasuryId && Number(proposal.id) === Number(treasuryId)) {
        setProposal(proposal as ProposalInfo);
        flag = true;
      }
    });
  };

  const submitVote = async () => {
    try {
      if (proposal === undefined) return;
      const { state } = proposal;
      const voteKind =
        votingState === VotingState.AGREE
          ? VoteKind.FOR
          : votingState === VotingState.DISAGREE
          ? VoteKind.AGAINST
          : votingState === VotingState.SOSO
          ? VoteKind.ABSTAIN
          : undefined;
      if (voteKind === undefined) return;
      setIsLoading(true);
      const isSubmited = await web3.castVote(Number(proposal.id), voteKind);
      if (isSubmited) {
        setIsSubmited(true);
        setIsFinished(true);
      }
      setIsLoading(false);
    } catch (e) {
      console.log("error - submitVote:", e);
      setIsLoading(false);
      setIsDenied(true);
    }
  };

  useEffect(() => {
    if (user === undefined) {
      signIn();
      return;
    } else {
      getArtistAllProposalInfo();
    }
  }, [user, isSubmited]);

  return (
    <>
      <div className="treasurypage_wrapper">
        <Link className="link goback_btn_wrapper" to="/artist-page/NEWJEANS">
          <div className="goback_btn" />
          <div className="txt">PROPOSAL</div>
        </Link>
        <div className="main_contents_wrapper">
          {renderLeftSideContent()}
          {renderRightSideContent()}
        </div>
        <div
          className={classNames("submit_btn_wrapper", {
            selected: votingState !== undefined && !isSubmited,
            isSubmited,
          })}
          onClick={submitVote}
        >
          SUBMIT
        </div>
      </div>
      {isLoading ? <LoadingModal type="voting" /> : <></>}
      <FinishedToast
        isFinished={isFinished}
        closeFinishedToast={closeFinishedToast}
      />
      <DeniedToast isDenied={isDenied} closeDeniedToast={closeDeniedToast} />
    </>
  );
};

export default TreasuryPage;
