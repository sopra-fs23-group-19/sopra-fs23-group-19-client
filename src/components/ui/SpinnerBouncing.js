import React from "react";
import "styles/ui/SpinnerBouncing.scss";

export const SpinnerBouncing = (props) => {
  return (
    <div className="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
