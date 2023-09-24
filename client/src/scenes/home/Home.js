import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Make sure to import your CSS file
import logoImage from "../../assets/logo.png";
import "../../assets/unsplash_uB2iZgZSQtQ.png";
import connectingImg from "../../assets/connectimg.png";
import newsUpdateImg from  "../../assets/news_updateimg.png";
import propertyManImg from "../../assets/propertymanagimg.png";

const Home = () => {
  return (
    <div>
      <div className="hero-header">
        <div className="hero">
            <a href="/">
              <img src={logoImage} alt="DECOHOA Logo" />
            </a>
            <ul className="links">
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="/con">Contact Us</Link>
            </ul>
            <ul className="links">
              <div className="but-sign-up">
              <button className="sign-up" onClick={() => window.location.href = "/signin" }>Sign In</button>
            </div>
            </ul>
        </div>
        <div className="hero-two">
          <div className="hero-main">
            <div className="bold-header">Deco<br/>Homeowner's<br/>Association<br/>System</div>
            <br />
              <div className="hero-sec-text">
                <br/>
              </div>
            <br />
            <div className="but-sign-up">
              <button className="sign-up" onClick={() => window.location.href = "/signup" }>Sign up</button>
            </div>
          </div>
        </div>
      </div>

      <div className="inspi-q">
        <div className="quote">
          This is an inspiring quote, or a testimonial from a customer. Maybe
          it's just filling up space, or maybe people will actually read it.
          Who knows? All I know is that it looks nice.
        </div>
        <div className="thor-name">-Thor, God of Thunder</div>
      </div>

      <div className="content-random"><br/>
        <div className="random-title">Deco HOA Services</div>
        <div className="content-container">
          <div className="info-ran">
            <img src={connectingImg} alt="services-img" className="larger-image" width="300" height="300" />
            <div className="text">
              Connect with Homeowners
            </div>
          </div>
          <div className="info-ran">
            <img src={newsUpdateImg} alt="services-img" className="larger-image" width="300" height="300" />
            <div className="text">
              News and Activities
            </div>
          </div>
          <div className="info-ran">
            <img src={propertyManImg} alt="services-img" className="larger-image" width="300" height="300"/>
            <div className="text">
              Manage your property
            </div>
          </div>
        </div>
      </div>

    
      <div className="footer">
        Copyright © The Odin Project by Joseph Lloyd Marumas 2022
      </div>
    </div>
  );
};

export default Home;
