import "../css/LoadingModal.css";

const LoadingModal = ({ type }: { type?: string }) => {
  return (
    <>
      <div className="background" />
      <div className="modal-wrapper loadingmodal">
        <img
          src={
            type === "voting"
              ? require("../img/voting.gif")
              : type === "makingProposal"
              ? require("../img/makingProposal.gif")
              : require("../img/loading.gif")
          }
          alt=""
        />
      </div>
    </>
  );
};

export default LoadingModal;
