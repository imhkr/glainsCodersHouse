import react, { useState, useEffect } from "react";
import { getUsers } from "../../Service/api";
import ResourceCard from "../ResourceCard/ResourceCard";
import { useHistory } from "react-router-dom";
import styles from "./AllUsers.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../shared/Button/Button";
const AllUsers = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, [users]);
  const AddArticle = () => {
    history.push("/addArticle");
  };

  const getAllUsers = async () => {
    let response = await getUsers();

    setUsers(response.data);
  };

  return (
    <>
      <div className="ResourceCardsWrapper">
        {users.map((post, i) => (
          <div className="ResourceCard" key={i}>
            <ResourceCard
              imageLink={post.ImageLink}
              _id={post._id}
              Heading={post.Heading}
              Category={post.Category}
              Content={post.Content}
              CreatorId={post.CreatorId}
              CreatorName={post.CreatorName}
            />
          </div>
        ))}
      </div>
      <div className={styles.Add}>
        <Button text="+" onClick={AddArticle}></Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AllUsers;
