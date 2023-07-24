import React from "react";
import { Outlet } from "react-router-dom";

//components
import NavBar from "../components/NavBar";

import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
