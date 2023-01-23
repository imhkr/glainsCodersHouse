import React, { useState } from "react";
import styles from "./ResourceCard.module.css";
import SubResouceDialog from "../SubResouceDialog/SubResouceDialog";
const ResourceCard = ({
  _id,
  imageLink,
  Heading,
  Content,
  CreatorName,
  Category,
}) => {
  const [showModal, setShowModal] = useState(false);
  function openModal() {
    setShowModal((prev) => !prev);
  }
  return (
    <div onClick={openModal} className="cursorP">
      {showModal && <SubResouceDialog postId={_id} />}
      <div className="PostCardWrapper">
        <div className={styles.card}>
          <img src={imageLink} width={160} height={160}></img>
          <div>
            <div className={styles.names}>
              <h3>{Heading}</h3>
            </div>
            <div className={styles.Creator}>
              <h6>Category:{Category}</h6>
              <h6>By:{CreatorName}</h6>
            </div>
          </div>
          <div className={styles.peopleCount}>
            <h4>{Content}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
