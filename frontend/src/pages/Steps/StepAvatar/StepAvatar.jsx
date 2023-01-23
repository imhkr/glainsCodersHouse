import React, { useState, useEffect } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }
  async function submit() {
    if (!avatar) {
      (function showToastMessage() {
        toast.error("Please Upload Your Profile Picture", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })();
      return;
    }
    setLoading(true);
    if (name && avatar) {
      try {
        const { data } = await activate({ name, avatar });
        if (data.auth) {
          if (!unMounted) {
            dispatch(setAuth(data));
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => {
      setUnMounted(true);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress..." />;
  return (
    <>
      <Card title={`Okay, ${name}`} icon="monkey-emoji">
        <p className={styles.subHeading}>How’s this photo?</p>
        <h6 className={styles.subHeading}>
          *Photo size should be less than 40KB{" "}
        </h6>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a Photo
          </label>
        </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
      <ToastContainer />
    </>
  );
};

export default StepAvatar;
