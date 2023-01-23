import React from "react";
import styles from "./Button.module.css";
const Button = ({ text, onClick, imgTrue }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span>{text}</span>
      {imgTrue && (
        <img
          className={styles.arrow}
          src="/images/arrow-forward.png"
          alt="arrow"
        />
      )}
    </button>
  );
};
export default Button;
