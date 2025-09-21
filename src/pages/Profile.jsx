import React from 'react';
import Header from '../components/Header';
import ProfileContent from '../components/ProfilePageComponent';
import Footer from '../components/Footer';
import Menu from "./../components/MenuComponent"

import "./../styles/side.css"

const Profile = () => {
    return (
        <div>
            {/* <Menu id='side'></Menu> */}
            <Header />
            <ProfileContent />
            <Footer />
        </div>
    );
};

export default Profile;