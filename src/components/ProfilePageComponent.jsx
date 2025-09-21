import React from 'react';

import "./../styles/ProfilePageComponent.css"; // Assuming you have a CSS file for styling


const ProfilePageComponent = () => {



    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Profile Page</h1>
            <div style={{ marginTop: '20px' }}>
                {/* <h2>User Information</h2> */}
                <p><strong>Name:</strong> Srinivas Charan K</p>
                <p><strong>Email:</strong> 2300033153@kluniversity.in</p>
                <p><input class="None" type="button" value="Edit" title='Coming Soon...'  /></p>
            </div>
            {/* <div style={{ marginTop: '20px' }}>
                <h2>Settings</h2>
                <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Edit Profile</button>
            </div> */}
        </div>
    );
};

export default ProfilePageComponent;