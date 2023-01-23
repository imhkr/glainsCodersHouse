import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    if (!phoneNumber) return;
    const regexPhoneNumber =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phoneNumber.match(regexPhoneNumber) && phoneNumber.length == 10) {
      const { data } = await sendOtp({ phone: phoneNumber });
      console.log(data);
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
      onNext();
    } else {
      (function showToastMessage() {
        toast.error("Enter a Valid Phone Number", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })();
      //   <Alert error={"Please Enter a Valid Phone"}></Alert>;
      return;
    }
  }

  return (
    <>
      <Card title="Enter your phone number" icon="phone">
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
      <ToastContainer />
    </>
  );
};

export default Phone;
