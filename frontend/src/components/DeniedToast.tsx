import classNames from "classnames";
import "../css/DeniedToast.css";

interface DeniedToastProps {
  isDenied: boolean;
  closeDeniedToast: () => void;
}

const DeniedToast = ({ isDenied, closeDeniedToast }: DeniedToastProps) => {
  return (
    <div
      className={classNames("toast_wrapper", { display: isDenied })}
      onClick={closeDeniedToast}
    >
      <img src={require("../img/canceled.gif")} alt="" />
    </div>
  );
};

export default DeniedToast;
