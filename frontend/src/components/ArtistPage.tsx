import { BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ArtistPage.css";
import {
  STATUS,
  UserInfo,
  Web3Type,
  PhotoCardInfo,
  ProposalInfo,
} from "../types";
import { getNftImgInfos } from "../utils/handleNft";
import Carousel from "./Carousel";
import DeniedToast from "./DeniedToast";
import FinishedToast from "./FinishedToast";
import LoadingModal from "./LoadingModal";
import ProposalModal from "./ProposalModal";
import TreasuryCard from "./TreasuryCard";

interface ArtistPageProps {
  web3: Web3Type;
  user: UserInfo | undefined;
  signIn: () => Promise<void>;
}

const ArtistPage = ({ web3, user, signIn }: ArtistPageProps) => {
  const { artistPageToken } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [biddingVal, setBiddingVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [proposals, setProposals] = useState<ProposalInfo[]>([]);
  const [proposalUpdateCnt, setProposalUpdateCnt] = useState<number>(0);
  const [photocardInfo, setPhotocardInfo] = useState<PhotoCardInfo | undefined>(
    undefined
  );
  const [remainTime, setRemainTime] = useState<{
    hour: number;
    min: number;
    sec: number;
  }>({ hour: 0, min: 0, sec: 0 });
  const [photoCardInfos, setPhotoCardInfos] = useState<PhotoCardInfo[]>([]);
  const [cardIndex, setCardIndex] = useState(0);

  const updateProposal = () => {
    setProposalUpdateCnt(proposalUpdateCnt + 1);
  };

  const changeCardIndex = (index: number) => {
    setCardIndex(index);
  };

  const closeFinishedToast = () => {
    setIsFinished(false);
  };
  const closeDeniedToast = () => {
    setIsDenied(false);
  };

  const setRemainTimeInterval = () => {
    if (photoCardInfos.length === 0) return;
    const endTime = photoCardInfos[cardIndex].currentAuction.finalAuctionTime;
    const getTime = () => {
      const currentDate = Date.now() / 1000;
      const diff = Number(endTime) - currentDate;
      if (typeof Math.round(diff / 3600) === "number")
        setRemainTime({
          hour: Math.round(diff / 3600),
          min: Math.round((diff % 3600) / 60),
          sec: Math.round((diff % 3600) % 60),
        });
    };
    getTime();
    setInterval(getTime, 1000);
  };

  const getArtistAllProposalInfo = async () => {
    const response = await web3.getArtistAllProposalInfo("NEWJEANS");
    console.log("getArtistAllProposalInfo response", response);
    setProposals(response as ProposalInfo[]);
  };

  const getArtistPhotoCardHistoryInfo = async () => {
    const responseFromContract = await web3.getArtistPhotoCardHistoryInfo(
      "NEWJEANS"
    );
    const imageInfos = await getNftImgInfos(responseFromContract);
    console.log(
      "successfully get imageinfos from getnftimginfos, imageInfos: ",
      imageInfos
    );

    if (
      responseFromContract &&
      responseFromContract.length > 0 &&
      imageInfos.length === responseFromContract.length
    ) {
      const newPhotoCardInfos = [];
      for (let i = 0; i < imageInfos.length; i++) {
        const { currentAuction, metadataURI } = responseFromContract[i];
        const imageInfo = imageInfos[i];
        const photoCardInfo: PhotoCardInfo = {
          currentAuction,
          metadataURI,
          imageInfo,
        };
        newPhotoCardInfos.push(photoCardInfo);
      }
      setPhotoCardInfos(newPhotoCardInfos);
      setCardIndex(newPhotoCardInfos.length - 1);
    }
  };

  const getArtistPhotoCardInfo = async () => {
    const photoCardInfo = await web3.getArtistPhotoCardInfo("NEWJEANS");

    if (photoCardInfo) {
      const { currentAuction, metadataURI } = photoCardInfo;
      const [imageInfo] = await getNftImgInfos([photoCardInfo]);
      setPhotoCardInfos([
        { currentAuction, metadataURI, imageInfo },
        ...photoCardInfos.slice(1),
      ]);
    }
  };

  useEffect(() => {
    if (user === undefined) {
      signIn();
      return;
    } else {
      getArtistPhotoCardHistoryInfo();
      getArtistAllProposalInfo();
    }
  }, [user]);

  useEffect(() => {
    if (user) getArtistAllProposalInfo();
  }, [proposalUpdateCnt]);

  useEffect(() => {
    setRemainTimeInterval();
  }, [photoCardInfos]);

  if (artistPageToken === undefined) {
    return <div></div>;
  }
  // const [artistId, cardId] = artistPageToken.split("-");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderArtistInfo = () => {
    return (
      <>
        <div className="artistinfo">
          <img
            className="artistinfo_img"
            src={require("../img/dummy-artistinfo.png")}
            alt=""
          />
          <div className="artistinfo_text">
            <div className="title">
              Hi, <br />
              We're NewJeans!
            </div>
            <div className="line" />
            <div className="minititle">둘, 셋! 안녕하세요, NewJeans입니다!</div>
          </div>
        </div>
        <div className="artistinfo_bar" />
      </>
    );
  };

  const getBidAmount = () => {
    const web3Utils = web3?.web3Utils;
    if (photoCardInfos[cardIndex] === undefined || !web3Utils) return "0.15";
    const test = photoCardInfos[cardIndex]?.currentAuction.amount;
    const stringifyAmount = test as unknown as string;
    return web3Utils.fromWei(stringifyAmount, "ether");
  };

  const getMinBidAmount = () => {
    return Math.ceil(Number(getBidAmount()) * 1.05 * 100000) / 100000;
  };

  const renderArtistPhotoCards = () => {
    const displayTime = (time: number) => {
      return time < 0 ? "00" : time < 10 ? `0${time}` : time;
    };

    const renderBiddingInfo = () => {
      const bidAmount = getBidAmount();
      return (
        <div className="biddinginfo-wrapper">
          <div className="row-wrapper">
            <div className="left-wrapper">
              <div className="header">CURRENT BID</div>
              <div className="value">
                <>
                  {bidAmount}
                  <div className="bnb_icon" />
                </>
              </div>
            </div>
            <div className="right-wrapper">
              <div className="header">AUCTION ENDS IN</div>
              <div className="value">
                {`${displayTime(remainTime.hour)}:${displayTime(
                  remainTime.min
                )}:${displayTime(remainTime.sec)}`}
              </div>
            </div>
          </div>
          <div className="row-wrapper">
            <div className="left-wrapper">
              <div className="header high">LAST BID</div>
              <div className="value">
                <div className="charactor_icon" />
                <div className="address">
                  {photoCardInfos[cardIndex] &&
                  photoCardInfos[cardIndex].currentAuction.bidder
                    ? photoCardInfos[cardIndex].currentAuction.bidder.slice(
                        0,
                        6
                      ) +
                      "..." +
                      photoCardInfos[cardIndex].currentAuction.bidder.slice(-4)
                    : "loading..."}
                </div>
              </div>
            </div>
            <div className="right-wrapper">
              <div className="header"></div>
              <div className="value">
                {photocardInfo ? (
                  <a
                    className="outlink_icon"
                    href={`https://bscscan.com/address/${photocardInfo.currentAuction.bidder}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ) : (
                  <></>
                )}
                <div className="whiteline" />
              </div>
            </div>
          </div>
        </div>
      );
    };

    const handlePlaceBid = async () => {
      try {
        console.log("biddingVal", biddingVal);
        setIsLoading(true);
        await web3.createBid(1, Number(biddingVal));
        console.log("createBid finished");
        await getArtistPhotoCardInfo();
        console.log("getArtistPhotoCardInfo finished");
        setIsLoading(false);
        setIsFinished(true);
        setBiddingVal("");
      } catch (e) {
        console.log("error - ", e);
        setIsLoading(false);
        setIsDenied(true);
      }
    };

    return (
      <>
        <div className="artistcards">
          <div className="artistcards-title">Auction</div>
          <div className="artistcards-wrapper">
            <div className="cards-wrapper">
              <Carousel
                changeCardIndex={changeCardIndex}
                photoCardInfos={photoCardInfos}
              />
            </div>
            <div className="cardinfo-wrapper">
              <div className="title">
                {`Photocard #${
                  photoCardInfos[cardIndex] &&
                  photoCardInfos[cardIndex].currentAuction.photoCardId
                    ? photoCardInfos[cardIndex].currentAuction.photoCardId
                    : "loading..."
                }`}
              </div>
              <div className="sub-title">
                첫 번째 앨범 “NewJeans”의 다니엘 미공개 컷.
              </div>
              <div className="line" />
              {renderBiddingInfo()}
              <div className="input-wrapper">
                <input
                  placeholder={`${getMinBidAmount()} or more`}
                  value={biddingVal}
                  onChange={(e) => {
                    const val = e.target.value;
                    const num = Number(e.target.value);
                    if (
                      !isNaN(num) &&
                      (val.length < getMinBidAmount().toString().length ||
                        num >= getMinBidAmount())
                    ) {
                      setBiddingVal(val);
                    }
                  }}
                />
                <div className="input-btn" onClick={handlePlaceBid}>
                  PLACE BID
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderFantosiHouseBtnBar = () => {
    return (
      <div className="fantosihouse-wrapper">
        <div className="fantosihouse-btn" />
        <div
          className="fantosihouse-txt"
          onClick={() => {
            setIsDenied(!isDenied);
          }}
        >
          하루에 하나씩 발행되는 포토 카드의 주인이 되어보세요! 수익금 전액은
          We've collected..에서 확인할 수 있으며 community에 의해 <br />
          관리되고 사용됩니다. Fantosi House는 아티스트, 포토카드 holder,
          커뮤니티 참여자 모두가 함께하는 공간입니다.
        </div>
      </div>
    );
  };

  const renderProposals = () => {
    // console.log("proposals", proposals);
    const datas = [
      {
        id: 116,
        expiredIn: 2,
        status: STATUS.EXECUTED,
        title: "익선동 카페 [오늘다움]에서 2022 다니엘 생일 카페 개최",
        likedByArtist: false,
      },
      {
        id: 115,
        expiredIn: 5,
        status: STATUS.ACTIVE,
        title: "tvn 방송 [유퀴즈 온더 블럭] 뉴진스 출연 밥차 조공",
        likedByArtist: false,
      },
      {
        id: 114,
        expiredIn: 16,
        status: STATUS.CANCELED,
        title: "뉴진스 [인기가요 데뷔] 첫방 기념 밥차 서포트",
        likedByArtist: false,
      },
      {
        id: 113,
        expiredIn: 17,
        status: STATUS.DEFEATED,
        title: "뉴진스 프리 싱글 [Ditto] 발매 기념 멜론 300곡 스트리밍권 100장",
        likedByArtist: false,
      },
      {
        id: 112,
        expiredIn: 18,
        status: STATUS.QUEUED,
        title:
          "추운 날씨에도 사녹 와주는 고마운 우리 버니즈를 위한 맛난 도시락 역조공!",
        likedByArtist: true,
      },
      {
        id: 111,
        expiredIn: 20,
        status: STATUS.EXECUTED,
        title: "데뷔 500일 기념 [역삼역 3번 출구] 지하철 광고",
        likedByArtist: false,
      },
      {
        id: 110,
        expiredIn: 22,
        status: STATUS.ACTIVE,
        title: "[뉴진스 & 버니즈] 이름으로 [초록우산 기부재단] 2100만원 기부",
        likedByArtist: false,
      },
    ];
    return (
      <>
        <div className="treasury-wrapper">
          <div className="treasury-wrapper-title">WE'VE COLLECTED.</div>
          <div className="treasury-history" />
          <div className="treasury-header">
            <div className="treasury-header-title">
              커뮤니티에서 함께하고 싶은 아이디어에 투표하고, 당신의 제안도
              올려주세요!
            </div>
            <div className="makeproposal-btn" onClick={openModal}>
              MAKE PROPOSAL
            </div>
          </div>
          <div className="treasury-cards">
            {datas.map((data, index) => {
              const { id, expiredIn, status, title, likedByArtist } = data;
              return (
                <TreasuryCard
                  key={index}
                  id={id}
                  expiredIn={expiredIn}
                  status={status}
                  title={title}
                  likedByArtist={likedByArtist}
                />
              );
            })}
          </div>
          <div className="pagination" />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="artistpage">
        {renderArtistInfo()}
        {renderArtistPhotoCards()}
        {renderFantosiHouseBtnBar()}
        {renderProposals()}
      </div>
      {showModal ? (
        <ProposalModal
          closeModal={closeModal}
          updateProposal={updateProposal}
          web3={web3}
        />
      ) : (
        <></>
      )}
      {isLoading ? <LoadingModal /> : <></>}
      <FinishedToast
        isFinished={isFinished}
        closeFinishedToast={closeFinishedToast}
      />
      <DeniedToast isDenied={isDenied} closeDeniedToast={closeDeniedToast} />
    </>
  );
};

export default ArtistPage;
