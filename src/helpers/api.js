import axios from "axios";
import { getDomain } from "helpers/getDomain";

// export const api = axios.create({
//   baseURL: getDomain(),
//   headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
// });
const api = () => {
  const token_header = {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  };
  const bearerToken = localStorage.getItem("token");
  if (bearerToken != null) {
    token_header["Authorization"] = `Bearer ${bearerToken}`;
  }
  // console.log(token_header);
  return axios.create({
    baseURL: getDomain(),
    headers: token_header,
  });
};
const handleNotLogInError = (
  history,
  error,
  statusName,
  stayOnPage = false
) => {
  alert(
    `Oops! Something went wrong while ${statusName}: \n${handleError(error)}`
  );
  //specifically for Not Log In, force the page return to /login.
  if (error.response.data.status == 401 && stayOnPage == false) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push("/login");
  }
  //internal server error
  if (error.response.data.status == 500 && stayOnPage == false) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push("/login");
  }
};

const handleError = (error) => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log(
      "The request was made and answered but was unsuccessful.",
      error.response
    );
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert("The server cannot be reached.\nDid you start it?");
    }

    console.log("Something else happened.", error);
    return error.message;
  }
};

export { api, handleError, handleNotLogInError };
