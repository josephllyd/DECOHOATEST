import React from "react";
// import { Link } from "react-router-dom";
import "./Home.css"; // Make sure to import your CSS file
import logoImage from "../../assets/logo.png";
import "../../assets/unsplash_uB2iZgZSQtQ.png";
import connectingImg from "../../assets/connectimg.png";
import newsUpdateImg from  "../../assets/news_updateimg.png";
import propertyManImg from "../../assets/propertymanagimg.png";


const Home = () => {
  return (
    <div>
      <div id="sign" className="hero-header">
        <div className="hero">
            <a href="/">  
              <img src={logoImage} alt="DECOHOA Logo" />
            </a>
            <nav>
            <ul className="links">  
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#con">Contact Us</a>
            </ul>
            {/* <ul className="links">
              <Link to="#about">About</Link>
              <Link to="#services">Services</Link>
              <Link to="#con">Contact Us</Link>
            </ul> */}
            </nav>
            
           
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
      
      <div id="about" className="inspi-q">
        <div className="inspi-q__inside">
          <div className="AboutDECO">
                <div className="quote">
                  About DECO
                </div> 
                <div className="thor-name">
                The Homeowners Association System is a comprehensive platform designed to manage and organize information related to individuals living within a residential community, 
                which could include subdivisions, condominiums, townhouses, and standalone houses. It captures essential details such as announcements, specific unit occupied, 
                financing arrangements (fully paid, bank-financed, or through Pag-ibig), and even vehicle information including the presence of cars along with their plate numbers 
                and parking details.
                </div>
          </div>
        </div>
        <div className="border-inspi">
              </div>
              <div className="inside-border">
                  <div className="number-1">
                    100
                    <div className="size">Properties</div>
                  </div>
                  <div className="number-2">
                    99
                    <div className="size">Families</div>
                  </div>
                  <div className="number-3">
                    468
                    <div className="size">Occupants</div>
                  </div>
                  <div className="number-4">
                    8
                    <div className="size">Amneties</div>
                  </div>
                </div>
        <div id="services" className="content-random"><br/>
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
        <div id="con" className="footer">
          <div className="insideDeco">
          <div className="DecoHoa">
        <a href="/">  
              <img src={logoImage} alt="DECOHOA Logo" /><br/><br/>N.Bacalso Avenue, Cebu City<br/>Cebu, Philippines, 6000<br/><br/>deco+hoa@gmail.com<br/><br/>+(032)488-9125
            </a>
            
        </div>
        
        <div className="find">Find your way:
        <nav>
          <ul className="links2">
          <a href="#sign"><br></br><br></br>Sign In</a>
              <a href="#about">About Deco</a>
              <a href="#services">Services</a>
          </ul>
        </nav>
        </div>
          </div>
          <div className="border2"></div>
          <div className="ending">
          <a href="/">  
              <img src={logoImage} alt="DECOHOA Logo" /> . All Rights Reserved
            </a>
          </div>
         
 
        {/* Copyright © The Deco Homeowners' Association System by Mercado Family 2022 */}
      </div>
    </div>
      </div>
      </div>
  );
};

export default Home;