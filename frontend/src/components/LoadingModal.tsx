import "../css/LoadingModal.css";

const LoadingModal = () => {
  return (
    <>
      <div className="background" />
      <div className="modal-wrapper loadingmodal">
        <img src={require("../img/loading.gif")} alt="" />
      </div>
    </>
  );
};

export default LoadingModal;
