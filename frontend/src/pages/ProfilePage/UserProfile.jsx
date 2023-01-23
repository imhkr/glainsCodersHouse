import React, { useState } from "react";
import Card from "../../components/shared/Card/Card";
import styles from "./UserProfile.module.css";
// ../../../components/shared/Card/Card
// // import TextInput from "../../../components/shared/TextInput/TextInput";
// import styles from "./UserProfile.module.css";
// import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
// import { setAuth } from "../../../store/authSlice";
// import { useDispatch } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className={styles.center}>
        <Card title={`${user?.name}`} icon="logo">
          <img
            className={styles.avatar}
            src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
            width="200"
            height="200"
            alt="avatar"
          />
          <h3>Joined On:{" " + user.createdAt}</h3>
          <h3>UserID:{" " + user.id}</h3>
          <h3>PhoneNumber:{" " + user.phone}</h3>
        </Card>
      </div>
    </>
  );
};

export default UserProfile;
