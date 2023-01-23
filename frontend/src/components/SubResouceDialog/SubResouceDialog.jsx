import React, { useState, useEffect } from "react";
import styles from "./SubResourceDialog.module.css";
import { useHistory } from "react-router-dom";
import { getUser, deleteUser, getUsers } from "../../Service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const SubResouceDialog = ({ postId }) => {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    getPost(postId);
    loadUserDetails(postId);

    return () => {
      getPost(postId);
      loadUserDetails(postId);
      getAllUsers();
    };
  }, [postId]);
  let CreatorId;
  let response;

  const loadUserDetails = async (postId) => {
    response = await getUser(postId);
    CreatorId = response["data"]["CreatorId"];
    setUserInfo(response);
  };
  async function editPost(postId) {
    response = await getUser(postId);
    CreatorId = response["data"]["CreatorId"];
    if (CreatorId == user.id) {
      history.push(`/edit/${postId}`);
    } else {
      (function showToastMessage() {
        toast.error("You are not owner of this article", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })();
    }
  }
  const deleteUserData = async (id) => {
    response = await getUser(postId);
    CreatorId = response["data"]["CreatorId"];
    if (CreatorId == user.id) {
      await deleteUser(id);
      getAllUsers();
    } else {
      (function showToastMessage() {
        toast.error("You are not owner of this article", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })();
    }
  };
  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };
  const [data, setData] = useState([]);
  const getPost = async (postId) => {
    let response = await getUser(postId);
    setData(response.data);
  };
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>{data.Heading}</h3>
          <h2 className={styles.subHeading}>{data.Content} </h2>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.footerButton}
            onClick={() => editPost(postId)}
          >
            <img
              src="/images/edit.png"
              width={20}
              height={20}
              alt="celebration"
            />
            <span>Edit</span>
          </button>
          <button
            className={styles.footerButton}
            onClick={() => deleteUserData(postId)}
          >
            <img
              src="/images/delete.png"
              width={20}
              height={20}
              alt="celebration"
            />
            <span>Delete</span>
          </button>
          <h6 className={styles.gap}>
            ** Edit/Delete (Only Works if your are content owner)
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SubResouceDialog;
