import React from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((store) => store.user);

  return (
    <div className="flex justify-center my-5">
      <div className="card card-side bg-base-100 shadow-sm w-1/2">
        <figure>
          <img src={userData.photoUrl} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {userData.firstName} {userData.lastName}
          </h2>
          <p>{userData.description}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
