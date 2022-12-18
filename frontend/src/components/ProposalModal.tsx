import classNames from "classnames";
import { useState } from "react";
import "../css/ProposalModal.css";

interface ProposalModalProps {
  closeModal: () => void;
}

const ProposalModal = ({ closeModal }: ProposalModalProps) => {
  const [idea, setIdea] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");

  const onClickSubmitBtn = () => {
    setIdea("");
    setAddress("");
    setPrice("");
    console.log(idea, address, price);
    closeModal();
  };

  return (
    <>
      <div className="background" onClick={closeModal} />
      <div className="modal-wrapper">
        <div className="modal-header">
          <div>Make Proposal</div>
          <div className="close-btn" onClick={closeModal} />
        </div>
        <div className="main-title">
          아티스트와 내가 함께하는 <br />
          새로운 아이디어 제안
        </div>
        <div className="title">Idea</div>
        <input
          className="idea"
          placeholder="아티스트를 위한 기발한 생각은 뭐든지 좋아요 :)"
          value={idea}
          onChange={(e) => {
            setIdea(e.target.value);
          }}
        />
        <div className="title">Description</div>
        <div className="disabled-input">
          Description 기능은 추후 제공할 예정입니다.
        </div>
        <div className="title">제안 통과 시 서포팅 수령 주소</div>
        <input
          className="address"
          placeholder="0xabx12342"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <div className="title">제안 실행 예상 금액</div>
        <div className="price-input-wrapper">
          <input
            className="price"
            placeholder=""
            value={price}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!isNaN(num)) setPrice(e.target.value);
            }}
          />
          <div className="bnb_icon" />
        </div>
        <div
          className={classNames("submit-btn", {
            ready: price.length > 0 && address.length > 0 && idea.length > 0,
          })}
          onClick={onClickSubmitBtn}
        >
          SUBMIT
        </div>
      </div>
    </>
  );
};

export default ProposalModal;
