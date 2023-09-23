import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//components
import NavBar from "../components/NavBar";

import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {

useEffect(() => {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid);
  } else {
    console.log("User Not Found");
  }
});
}, [])

  return (
    <>
    <div className="mb-28">
    <NavBar  />
    </div>
      <Outlet /> 
       <NewsLetter/> 
      <Footer />
    </>
  );
};

export default Home;
