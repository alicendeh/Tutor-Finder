import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import "./tutProfile.css";
import CreateReview from "./reviews/Review";
import AllReviews from "./ViewAllReviews/AllReviews";
import { useLocation } from "react-router";
import FirstBox from "./FirstBox";
import Box2 from "./Box2";
import TutorProfileHeader from "./TutorProfileHeader";
import Review from "./reviews/Review";
import LeaveReview from "./LeaveReview";

function App(props) {
  const authContext = useContext(AuthContext);

  const { ikeep, iStore, tutData } = authContext;

  const gender = localStorage.getItem("gender");
  const id = localStorage.getItem("id");

  return (
    <div
      className=" pt-3 pl-4 pr-4 pb-4"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <TutorProfileHeader />

      <div className="d-flex justify-content-between">
        <div className="" style={{ width: "29%" }}>
          <FirstBox />
          <Box2 />
        </div>
        <div className="" style={{ width: "70%", minHeight: "80vh" }}>
          <LeaveReview />
          <div style={{ minHeight: "70%" }} className="bg-white rounded p-4">
            <p className="h3 text-warning mb-4">Reviews</p>
            <AllReviews tut_id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;