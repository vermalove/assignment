import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "firebase/auth";
import AddTeam from "./AddTeam";
import RecordList from "./RecordList";
import { components } from 'react-select';
import { SCREEN } from "../constant/screen";
const Home = () => {
  const [routeToLogin, setRouteToLogin] = useState<any>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
useEffect(() => {
  firebase.auth().onAuthStateChanged(user=>{
    if(user===null)
    {
     navigate('/login',{replace:true});
    }
    })
    
   

  return () => {
    
  }
}, [])

  
  
// to hanlde logout in firebase
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate(SCREEN.LOGIN, { replace: true });
    } catch {}
  };
  // to open popup on home page
  const handleAddRecord = () => {
    setIsOpen(true);
  };
  
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
{/* popup components */}
      <AddTeam
        isOpen={isOpen}
        onClose={onClose}
      />
      {/* show list of add team member */}
      <RecordList isOpen={isOpen} />
    </div>
  );
};

export default Home;
