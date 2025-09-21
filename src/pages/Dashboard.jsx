import React from "react";
import Header from "../components/Header";
import MenuComponent from "../components/MenuComponent"; // Importing the Menu component
import MusicList from "../components/MusicList"; // Importing the MusicList component
import GeneralPlaylistComponent from "../components/GeneralPlaylistComponent"; // Importing the GeneralPlaylist component
import UserPlaylistComponent from "../components/UserPlaylistComponent"; // Importing the UserPlaylist component
import HistoryComponent from "../components/HistoryComponent"; // Importing the History component
import RecommendationComponent from "../components/RecommendationComponent"; // Importing the Recommendation component
import LikedComponent from "../components/LikedComponent"; // Importing the Liked component
import Footer from "../components/Footer"; // Importing the Footer component

import "./../styles/dashboardComponent.css"; // Importing the dashboard styles

const DashboardComponent = () => {
  return (
    <>
      <Header isLoggedIn={true}/>
    <div className="dashboard-container">
      {/* Left Menu Component */}
      <div className="dashboard-menu">
        {/* Add your menu component here, assuming it's in the layout */}
        <MenuComponent />
      </div>

      {/* Main Content Area */}
      <div className="dashboard-main-content">
        <h2>
          Songs List
        <MusicList />
        </h2>
        
        {/* Display various subcomponents */}
        <div id="dashboard-main-top">
        <GeneralPlaylistComponent />
        <UserPlaylistComponent />
        </div>
        <div id="dashboard-main-bottom">
        {/* <HistoryComponent /> */}
        {/* <RecommendationComponent /> */}
        {/* <LikedComponent /> */}
        </div>
      </div>
    </div>
        <Footer />
    </>
  );
};

export default DashboardComponent;
