import classNames from "classnames";
import "../css/FinishedToast.css";

interface FinishedToastProps {
  isFinished: boolean;
  closeFinishedToast: () => void;
}

const FinishedToast = ({
  isFinished,
  closeFinishedToast,
}: FinishedToastProps) => {
  return (
    <div
      className={classNames("toast_wrapper", { display: isFinished })}
      onClick={closeFinishedToast}
    >
      <img src={require("../img/finished.gif")} alt="" />
    </div>
  );
};

export default FinishedToast;
