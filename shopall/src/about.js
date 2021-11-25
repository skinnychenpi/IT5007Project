import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/css/flex-slider.css';
import './assets/css/fontawesome.css';
import './assets/css/trans.css';
import reportWebVitals from './reportWebVitals';
import {Link, Redirect, withRouter, NavLink } from 'react-router-dom';
import { __interactionsRef } from 'scheduler/tracing';

//This is the Title part
class Title extends React.Component {
  render(){
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content />
        <meta name="author" content />
        <title>ShopAll - Demo</title>
      </div>
    )
  }
}

//Pre Header
class Preheader extends React.Component {
  render(){
    return (
      <div id="pre-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <span>Your One-Stop Shopping Comparison Site</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

//Navigation

class Navigation extends React.Component {
  render (){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="#"><img src={require("./assets/images/header-logo.jpg").default} alt="" /></a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/search/most%20popular">Products</NavLink>
              </li>
              <li className="nav-item active">
               <NavLink className="nav-link" to="/about">About Us</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}


class Content extends React.Component {
    render() {
        return (
        
        <div class="about-page">
            <div class="container">
                <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                    <div class="line-dec"></div>
                    <h1>About Us</h1>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="left-image">
                    <img src={require("./assets/images/about-us.jpg").default} alt=""></img>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="right-content">
                    <h4>Who we are ? </h4>
                    <p>This is a course project aiming at building our own website. Developers are Mr. Chen YuHeng and Mr. Meng ZiWei from NUS.SoC. </p> 
                    <br></br>
                    <p>This website is built on React.js, Node.js, GraphQL as well as the love and efforts from two developers in both computer science and sneakers.</p>
                    <br></br>
                    <p><a href="https://www.pexels.com/photo/group-of-people-raising-right-hand-1059120/">Photo Credit</a> goes to Pexels website. </p>
                    <br></br>
                    <p><a rel="nofollow" href="https://www.tooplate.com/view/2114-pixie">Pixie HTML Template</a> can be converted into your desired CMS theme. You can use this Bootstrap v4.1.3 layout for any online shop. Please tell your friends about <a rel="nofollow" href="https://www.facebook.com/tooplate/">Tooplate</a>. Thank you.</p>
                    <div class="share">
                        <h6>Find us on: <span><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-linkedin"></i></a><a href="#"><i class="fa fa-twitter"></i></a></span></h6>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}


//Footer 

class Footer extends React.Component {
  render(){
    return(
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="logo">
                <img src={require("./assets/images/header-logo.jpg").default} alt="" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="footer-menu">
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Help</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">How It Works ?</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-12">
              <div className="social-icons">
                <ul>
                  <li><a href="#"><i className="fa fa-facebook" /></a></li>
                  <li><a href="#"><i className="fa fa-twitter" /></a></li>
                  <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                  <li><a href="#"><i className="fa fa-rss" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    
  }
}

//Subfooter

class Subfooter extends React.Component {
  render(){
    return(
      <div className="sub-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright-text">
                <p>Copyright © 2021 ShopAll
                  - Design: <a rel="nofollow" href="https://www.facebook.com/tooplate">Tooplate</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class AboutPage extends React.Component {


  render() {
      var homePage = <React.Fragment>
        <Title />
        <Preheader />
        <Navigation />
        <Content />
        <Footer />
        <Subfooter />
      </React.Fragment>
      
      return(
        <React.Fragment>
        {homePage}
        </React.Fragment>
      )
    }
}

export default withRouter(AboutPage);