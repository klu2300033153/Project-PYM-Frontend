// src/pages/PlayPage.js
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlayPageComponent from "../components/PlayPageComponent";

const PlayPage = () => {
  const { musicId } = useParams();

  return (
    <div>
      <Header />
      <PlayPageComponent musicId={musicId} />
      <Footer />
    </div>
  );
};

export default PlayPage;
