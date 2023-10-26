export const customAlert = (
  { type, title, description, icon, close },
  styledAlerts
) => {
  setTimeout(() => {
    const doc = document.getElementById("1");
    doc.classList.add(styledAlerts.closing);
  }, 3500);

  return (
    <div
      className={`${styledAlerts.toast} ${styledAlerts.apertura} ${
        type === "success"
          ? styledAlerts.success
          : type === "error"
          ? styledAlerts.error
          : type === "warning"
          ? styledAlerts.warning
          : styledAlerts.info
      }
    `}
      id="1"
    >
      <div className={styledAlerts.content}>
        <div className={styledAlerts.icon}>
          <img src={icon} alt="" />
        </div>
        <div className={styledAlerts.text}>
          <p className={styledAlerts.title}>{title}</p>
          <p className={styledAlerts.description}>{description}</p>
        </div>
      </div>
      <button className={styledAlerts.btnClose}>
        <div className={styledAlerts.icon}>
          <img src={close} alt="" />
        </div>
      </button>
    </div>
  );
};
