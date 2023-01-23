import React from "react";
import styles from "./TextInput.module.css";

const TextInput = (props) => {
  return (
    <div className={styles.gap}>
      <input
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

export default TextInput;
