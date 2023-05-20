import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const NotificationGuard = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  // if user is not logged in, redirects to the login
  return <Redirect to="/login" />;
};

NotificationGuard.propTypes = {
  children: PropTypes.node,
};
