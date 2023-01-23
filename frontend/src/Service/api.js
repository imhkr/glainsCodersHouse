import axios from "axios";

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = "http://localhost:5500";

export const getUsers = async () => {
  return await axios.get(`${usersUrl}/all`);
  // console.log("response", response);
  // return response.data;
};

export const getUser = async (id) => {
  //localhost:5500/api/all/24
  http: return await axios.get(`${usersUrl}/api/all/${id}`);
};
export const addUser = async (user) => {
  return await axios.post(`${usersUrl}/api/add`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${usersUrl}/api/delete/${id}`);
};
// http://localhost:5500/api/edit/42

export const editUser = async (id, user) => {
  return await axios.put(`${usersUrl}/api/edit/${id}`, user);
};
