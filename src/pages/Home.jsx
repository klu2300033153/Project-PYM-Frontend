import React from "react";
import Header from "./../components/Header";
import HomePageMainContent from "./../components/HomePageMainContent";
import Footer from "./../components/Footer";
import "./../styles/home.css";

const Home = () => {
  return (
    <div id="home">
      <Header />
      <HomePageMainContent />
      <Footer />
    </div>
  );
};

export default Home;
