import React from "react";
import cats from "styles/images/cats2.png";
import { Spinner } from "components/ui/Spinner";
import { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";

export default function GameLoading() {

  return (
    <div>
      <BaseContainer>
      <div
        className="lobby pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <h1 style={{
          left: "420px",
          top: "180px",
          color: "black",
          position: "absolute",
        }}>Page is loading, please wait. <SpinnerBouncing /></h1>
      </BaseContainer>
    </div>
  );
}
