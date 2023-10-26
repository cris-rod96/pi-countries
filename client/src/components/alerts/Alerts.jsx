import styledAlerts from "./Alerts.module.css";
import success from "../../assets/succes.svg";
import error from "../../assets/error.svg";
import close from "../../assets/close.svg";
import { customAlert } from "./TypeAlerts";
export const Alerts = (props) => {
  const { toast } = props;
  const objToasts = {
    success: {
      type: toast.type,
      title: "Success",
      description: toast.description,
      icon: success,
      close,
    },
    error: {
      type: toast.type,
      title: "Error",
      description: toast.description,
      icon: error,
      close,
    },
  };

  return (
    <div className={styledAlerts.contenedorAlerts} id="contenedorAlerts">
      {customAlert(objToasts[toast.type], styledAlerts)}
    </div>
  );
};
