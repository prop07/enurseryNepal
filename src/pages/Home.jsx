import { Outlet } from "react-router-dom";

//components
import NavBar from "../components/NavBar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

import { useUser } from "../context/UserContext";


const Home = () => {
  const {userId} = useUser();


  return (
    <  >
      <NavBar  />
      {userId ?<div className=" mt-16"></div> :<div className="mt-24 "></div>  }
      <Outlet />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
