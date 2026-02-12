import axios from "axios";

export const loginAdmin = (data) => {
  return axios.post(
    "http://localhost:4000/api/admin/auth/login",
    data
  );
};

