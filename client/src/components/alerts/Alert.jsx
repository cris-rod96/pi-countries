import styledAlert from "./Alert.module.css";
import success from "../../assets/succes.svg";
import error from "../../assets/error.svg";
import { useState } from "react";

export const Alert = (props) => {
  const show = props.show;
  const { type, description } = props.toast;
  const styleClass = () => {
    switch (type) {
      case "Success":
        return styledAlert.success;
      case "Error":
        return styledAlert.error;
      default:
        return styledAlert.success;
    }
  };
  return (
    <div
      className={`${styledAlert.boxAlert} ${styleClass()}  ${
        show ? styledAlert.show : ""
      } ${!show ? styledAlert.hiden : ""}`}
    >
      <div className={styledAlert.icon}>
        <img src={type === "Sucess" ? success : error} alt="" />
      </div>
      <div className={styledAlert.content}>
        <h3 className={styledAlert.typeAlert}>{type}</h3>
        <p className={styledAlert.description}>{description}</p>
      </div>
    </div>
  );
};
