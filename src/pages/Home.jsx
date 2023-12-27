import { Outlet } from "react-router-dom";

//components
import NavBar from "../components/NavBar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {


  return (
    <  >
      <NavBar  />
      <div className="mt-28 "></div>
      <Outlet />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
