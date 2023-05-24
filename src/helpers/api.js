import axios from "axios";
import { getDomain } from "helpers/getDomain";

const api = () => {
  const token_header = {
    "Content-Type": "application/json",
  };
  const bearerToken = localStorage.getItem("token");
  if (bearerToken != null) {
    token_header["Authorization"] = `Bearer ${bearerToken}`;
  }
  return axios.create({
    baseURL: getDomain(),
    headers: token_header,
    // adapter: require("axios/lib/adapters/xhr"),
  });
};
const handleNotLogInError = (
  history,
  error,
  statusName,
  stayOnPage = false
) => {
  //specifically for Not Log In, force the page return to /login.
  const response = error.response;
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    if (error.response.data.status == 401 && stayOnPage == false) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
      history.push("/login");
    }
    //internal server error
    if (error.response.data.status == 500 && stayOnPage == false) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
      history.push("/login");
    }
  }
  if (error.message.match(/Network Error/)) {
    history.push("/login");
  }
};
const handleError = (error) => {
  const response = error.response;
  let info = {};
  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    if (response.data.status) {
      info = {
        status: response.data.status,
        message: response.data.message,
      };
    } else {
      info = {
        status: response.status,
        message: response.data,
      };
    }

    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      info = {
        status: "",
        message: error.message,
      };
    }
    return info;
  }
};


export { api, handleError, handleNotLogInError };
