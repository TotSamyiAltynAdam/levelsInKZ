import React from 'react';
import headerImage from "../../resources/img/header.png";
import headerLogo from "../../resources/img/google.png";
import briefcase from "../../resources/icons/briefcase.svg";
import coin from "../../resources/icons/coin.svg";

import "./company-header.scss";

export default function CompanyHeader({ companyName, companyId }) {
    const handleSalariesClick = () => {
        window.location.reload();
    };
    return (
        <div className="company">
            <div className="headerImage">
                <img className="headerWallpaper" src={headerImage} alt="headerImage" />
                <div className="headerLogo">
                    <img src={headerLogo} alt="" height="65px" />
                    <h2>{companyName}</h2>
                </div>
                <div className="headerOption">
                    <div className="options">
                        <img className="iconsHeader grey-out" src={briefcase} alt="" height="17px" />
                        <p>Overview</p>
                    </div>
                    <div className="options" onClick={handleSalariesClick}>
                        <img className="iconsHeader grey-out" src={coin} alt="" height="17px" />
                        <p>Salaries</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

