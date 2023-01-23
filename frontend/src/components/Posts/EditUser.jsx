import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { getUser, editUser } from "../../Service/api";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./EditUser.module.css";
import Button from "../shared/Button/Button";
import Card from "../shared/Card/Card";
import TextArea from "../shared/TextArea/TextArea";
import TextInput from "../shared/TextInput/TextInput";
const initialValue = {
  Heading: "",
  Content: "",
  Category: "",
  CreatorId: "",
  CreatorName: "",
  ImageLink: "",
};

const EditUser = () => {
  const history = useHistory();
  const [data, setData] = useState(initialValue);
  let { Heading, Content, Category, CreatorId, CreatorName, ImageLink } = data;
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setData(response.data);
  };

  let allFilled = true;
  const editUserDetails = async () => {
    if (Heading == "" || Content == "" || Category == " ") {
      allFilled = false;
      (function showToastMessage() {
        toast.error("Kindly fill all required fields !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })();
    } else {
      await editUser(id, data);
    }
  };
  const redirect = () => {
    if (allFilled) {
      history.push(`/allarticles`);
    } else {
      history.push("/addArticle");
    }
  };

  return (
    <>
      <Card title="Create a fantastic article!!" icon="win">
        <label htmlFor="Heading">Heading</label>
        <TextInput
          onChange={(e) => onValueChange(e)}
          name="Heading"
          value={Heading}
          id="my-input"
        />
        <label htmlFor="Content">Content</label>
        <TextArea
          rows="10"
          col="0"
          onChange={(e) => onValueChange(e)}
          name="Content"
          value={Content}
          id="my-input"
        />
        <label htmlFor="Category">Category</label>
        <TextInput
          onChange={(e) => onValueChange(e)}
          name="Category"
          value={Category}
          id="my-input"
        />
        <label htmlFor="CreatorName">CreatorName</label>
        <TextInput name="CreatorName" value={user?.name} id="my-input" />
        <label htmlFor="CreatorId">CreatorId</label>
        <TextInput name="CreatorId" value={user?.id} id="my-input" />
      </Card>

      <div className={styles.gap}>
        <Button
          variant="contained"
          color="primary"
          onClick={function (event) {
            editUserDetails();
            redirect();
          }}
          text="Update Article"
        ></Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditUser;
