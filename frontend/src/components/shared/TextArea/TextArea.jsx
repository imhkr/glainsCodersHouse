import React from "react";
import styles from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <div className={styles.gap}>
      <textarea
        className={styles.input}
        style={{
          width: props.fullwidth === "true" ? "100%" : "inherit",
        }}
        type="text"
        {...props}
      />
    </div>
  );
};

export default TextArea;
