import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "firebase/auth";
import AddTeam from "./AddTeam";
import RecordList from "./RecordList";
const Home = () => {
  const [routeToLogin, setRouteToLogin] = useState<any>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {}, []);
  //  firebase.auth().onAuthStateChanged(user=>{
  //   setRouteToLogin(user)
  //   })
  //   if(routeToLogin===null)
  //   {
  //    navigate('/login',{replace:true});
  //   }

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate("/login", { replace: true });
    } catch {}
  };
  const handleAddRecord = () => {
    setIsOpen(true);
  };
  const recordData = (params: any) => {};
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="containerMain">
      <div className="topHeading">
        <h2>Team Member</h2>{" "}
        <button className="addMemberBtn" onClick={handleAddRecord}>
          Add Member +
        </button>
      </div>
      <div className="logoutContainer">
        {" "}
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <AddTeam
        isOpen={isOpen}
        recordData={() => recordData}
        onClose={onClose}
      />
      <RecordList isOpen={isOpen} />
    </div>
  );
};

export default Home;
