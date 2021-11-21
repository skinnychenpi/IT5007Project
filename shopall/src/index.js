
import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/css/flex-slider.css';
import './assets/css/fontawesome.css';
import './assets/css/tooplate-main.css';
import reportWebVitals from './reportWebVitals';

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
          <a className="navbar-brand" href=" ">< img src={require("./assets/images/header-logo.jpg").default} alt="" /></a >
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="index.html">Home
                  {/* <span className="sr-only">(current)</span> */}
                </a >
              </li>
              <li className="nav-item">
                <a className="nav-link" href="products.html">Products</a >
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">About Us</a >
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">Contact Us</a >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <div className= "searchbar">
        <div className="container">
          <div className ="searchbox">
            {/* <label className="discription"> Enter what you want: </label>
            <input type="text" class="search_key" value="What you want" />
            <button className="submit" >Search</button> */}
               <div className="discription">
                <h7>Enter what you want</h7>
                </div>
                <div className="searchcontent">
                <input type="text" class = "search_key" />
                </div>
                <div>

                <button className="button">
                  <a href="#">Search</a >
                </button></div>
                
              
                       
            
          </div>
        </div>
      </div>
    )
  }
}
//Banner

class Banner extends React.Component {
  render (){
    return (
      
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="caption">
                <h2>This is a Demo</h2>
                <div className="line-dec" />
                <p>This is our website Demo. Credit to Tooplate to provide sufficient template resources! Currently only <strong>index page</strong> included. In the future detailed product page and backend will be developed. 
                  <br /><br /></p >
                <div className="main-button">
                  <a href="#">Sign up Now!</a >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class SingleItem extends React.Component {
  render() {
    const entry = this.props.entry;
    return (
      <a href="single-product.html">
        <div className="featured-item">
          < img src = {entry.thumbnail} alt="Item 1" />
          <h4>{entry.shoeName}</h4>
          <h6>{"$"+entry.retailPrice}</h6>
        </div>
      </a >
    );
  }
}
// Featured items



class FeaturedItems extends React.Component {

  render(){
    const entries= this.props.data.map(entry => <SingleItem entry={entry} />)
    // const entry = this.props.data;
    return(
      <div className="featured-items">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                
                <h1>Most popular items</h1>
              </div>
            </div>
            <div>
                <a href="single-product.html">
                  <div className="single-featured-item">
                    {/* < img src = {entry[0].thumbnail} alt="Item 1" />
                    <h4>{entry[0].shoeName}</h4>
                    <h6>{"$"+entry[0].retailPrice}</h6> */}
                    {entries}
                  </div>
                </a >
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
                < img src={require("./assets/images/header-logo.jpg").default} alt="" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="footer-menu">
                <ul>
                  <li><a href="#">Home</a ></li>
                  <li><a href="#">Help</a ></li>
                  <li><a href="#">Privacy Policy</a ></li>
                  <li><a href="#">How It Works ?</a ></li>
                  <li><a href="#">Contact Us </a ></li>
                </ul>
              </div>
            </div>
            <div className="col-md-12">
              <div className="social-icons">
                <ul>
                  <li><a href="#"><i className="fa fa-facebook" /></a ></li>
                  <li><a href="#"><i className="fa fa-twitter" /></a ></li>
                  <li><a href="#"><i className="fa fa-linkedin" /></a ></li>
                  <li><a href="#"><i className="fa fa-rss" /></a ></li>
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
                  - Design: <a rel="nofollow" href="https://www.facebook.com/tooplate">Tooplate</a ></p >
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class Webpage extends React.Component {
  constructor() {
    super();
    this.state = {IL: null};
    this.loadData();
  }


  async graphQLFetch(query) {
    try {
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });
        const body = await response.text();
        const result = JSON.parse(body);

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code === 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch(e) {
        alert(`Error in sending data to the server: ${e.message}`);
    }
 }

 
 async loadData() {
   var query = `query {
    getMostPopular(count: 10){
      thumbnail shoeName retailPrice
    }
  }`;
    const responseItems = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
    });

    const resultItems = await responseItems.json();

    this.setState({ IL: resultItems.data.getMostPopular });
  }




  render() {
      var homePage = <React.Fragment>
        <Title />
        <Preheader />
        <Navigation />
        {/* <SearchBar /> */}
        <Banner />
        
        {/* <SingleItem /> */}
        {this.state.IL ? < FeaturedItems data = {this.state.IL} /> : <React.Fragment/>}
        {/* <GetItems /> */}
        {/* <Footer /> */}
        <Subfooter />
      </React.Fragment>
      
      return(
        <React.Fragment>
        {homePage}
        </React.Fragment>
      )
    }
}
// class Index extends React.Component {
//   render(){
//     return(
//       <div className="Webpage">
//         <Title />
//         <Preheader />
//         <Navigation />
//         <Banner />
//         {/* <SingleItem /> */}
//         <FeaturedItems />
//         <GetItems />
//         <Footer />
//         <Subfooter />
//       </div>
      

//     )
//   }
// }
ReactDOM.render(
  
    <Webpage />,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

