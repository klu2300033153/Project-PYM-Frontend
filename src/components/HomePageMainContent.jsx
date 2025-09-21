import React from "react";
import bannerImage from "./../assets/home_banner.png";
import projectLogo from "./../assets/PYM_Logo.jpg";
import "./../styles/HomePageMainContent.css"; // Make sure this CSS file is linked

const HomePageMainContent = () => {
  return (
    <div className="homepage-main">
      {/* Banner Image */}
      <div className="banner">
            <img src={bannerImage} alt="Banner" />
            <div className="banner-shadow"></div> {/* Shadow layer */}
        </div>

      {/* Content Section */}
      <div className="content">
        {/* Text Section */}
        <div className="text-content">
          <p>
            Welcome to <strong>Play Your Mood</strong>: your personal music companion! <br />
            Discover playlists curated to match every emotion, seamlessly and ad-free. <br />
            Immerse yourself in a world of music tailored to your feelings. <br />
            Connect with friends and explore trending tunes. <br />
            Experience the ultimate mood-based music journey with us.
          </p>
        </div>

        {/* Logo Section */}
        <div className="project-logo-container">
          <img src={projectLogo} alt="PYM Logo" className="project-logo" />
          <h2 className="gradient-text">Experience the <br /> <span>Rhythm of Your Life</span></h2>
        </div>
      </div>
    </div>
  );
};

export default HomePageMainContent;
