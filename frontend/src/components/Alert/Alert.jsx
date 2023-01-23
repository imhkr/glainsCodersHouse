import styles from "./Alert.module.css";

const Alert = ({ error, dis }) => {
  return (
    <>
      <div className={styles.wrapperwarning}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className={styles.subject}>
            <h3>{error}</h3>
            <p>{dis}</p>
          </div>
          <div className="icon-times">
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
