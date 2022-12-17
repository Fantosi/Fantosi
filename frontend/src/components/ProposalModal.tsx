import "../css/ProposalModal.css";

interface ProposalModalProps {
  closeModal: () => void;
}

const ProposalModal = ({ closeModal }: ProposalModalProps) => {
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
        />
        <div className="title">Description</div>
        <div className="disabled-input">
          Description 기능은 추후 제공할 예정입니다.
        </div>
        <div className="title">제안 통과 시 서포팅 수령 주소</div>
        <input className="address" placeholder="" />
        <div className="title">제안 실행 예상 금액</div>
        <div className="price-input-wrapper">
          <input className="price" placeholder="" />
          <div className="bnb_icon" />
        </div>
        <div className="submit-btn">SUBMIT</div>
      </div>
    </>
  );
};

export default ProposalModal;
