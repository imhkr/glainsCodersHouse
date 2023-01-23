import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { addUser } from "../../Service/api";
import { useSelector } from "react-redux";
import TextInput from "../shared/TextInput/TextInput";
import TextArea from "../shared/TextArea/TextArea";
import Card from "../shared/Card/Card";
import styles from "./AddUser.module.css";
import Button from "../shared/Button/Button";
import axios from "axios";
const initialValue = {
  Heading: "",
  Content: "",
  Category: "",
  CreatorId: "",
  CreatorName: "",
};

const AddUser = () => {
  const history = useHistory();
  const [data, setData] = useState(initialValue);
  let { Heading, Content, Category, CreatorId, CreatorName } = data;
  const { user } = useSelector((state) => state.auth);
  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [imageLink, setImageLink] = useState("");
  let ind = Math.floor(Math.random() * 30);
  const URL =
    "https://api.unsplash.com/search/photos?page=3&&per_page=101&query=technology&client_id=L1-B1K0i6IQSGC4v7KNQmDCovA-KOgHWJZjUTodM_mY";
  const getImages = async () => {
    const response = await axios.get(URL);
    console.log(response);
    let link = response.data.results[ind]["urls"]["full"];
    setImageLink(link);
  };
  useEffect(() => {
    getImages();
  }, []);

  const obj = {
    Heading: Heading,
    Content: Content,
    Category: Category,
    CreatorName: user.name,
    CreatorId: user.id,
    ImageLink: imageLink,
  };
  let allFilled = true;
  const addUserDetails = async () => {
    if (Heading == "" || Content == "" || Category == " ") {
      allFilled = false;
      (function showToastMessage() {
        toast.error("Kindly fill all required fields !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })();
    } else {
      await addUser(obj);
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
          imgTrue={true}
          onClick={function (event) {
            addUserDetails();
            redirect();
          }}
        >
          Add User
        </Button>
      </div>
      <ToastContainer />;
    </>
  );
};

export default AddUser;
