import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const FriendGuard = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login" />;
};

FriendGuard.propTypes = {
  children: PropTypes.node,
};
