import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const ProfileGuard = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login" />;
};

ProfileGuard.propTypes = {
  children: PropTypes.node,
};
