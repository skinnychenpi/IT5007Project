import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/css/flex-slider.css';
import './assets/css/fontawesome.css';
import './assets/css/searchpage.css';
import reportWebVitals from './reportWebVitals';
import {Link, Redirect, withRouter, NavLink} from 'react-router-dom';


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
              <li className="nav-item active">
                <NavLink className="nav-link" to="/search/most%20popular">Products</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/about">About Us</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}


class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {redirect : false};
        this.redirectHandler = this.redirectHandler.bind(this);
    }


    redirectHandler() {
        var keyword = this.refs.search_key.value;
        if (String(keyword) != "") {
            this.setState({redirect : true});
            this.props.refresher(keyword);
        }
    }

    render() {
        if (this.state.redirect) {
            this.setState({redirect : false});
            return <Redirect to={`/search/${String(this.refs.search_key.value)}`}/>;
        }
        return (
        <div className= "searchbar">
            <div className="container">
            <div className ="searchbox">
                {/* <label className="discription"> Enter what you want: </label>
                <input type="text" class="search_key" value="What you want" />
                <button className="submit" >Search</button> */}
                
                    <div className="searchcontent">
                    <input type="text" class = "search_key" ref = "search_key"/>
                    

                    <button  class="searchbutton" onClick = {this.redirectHandler}>search
                    {/* {this.refs.search_key ? <button  class="searchbutton"><Link to = {`search/${String(this.refs.search_key.value)}`}>Search</Link></button> : 
                    <button  class="searchbutton">search</button>} */}
                    </button>
                    </div>
                
                        
                
            </div>
            </div>
        </div>
        )
  }
}

// Banner

// class Banner extends React.Component {
//   render (){
//     return (
    

      
//       <div className="banner">

//         <div className="container">
        
//           <div className="row">
//             <div className="col-md-12">
//               <div className="caption">
//                 <h2>This is a Demo</h2>
//                 <div className="line-dec" />
//                 <p>This is our website Demo. Credit to Tooplate to provide sufficient template resources! Currently only <strong>index page</strong> included. In the future detailed product page and backend will be developed. 
//                   <br /><br /></p>
//                 <div className="main-button">
//                   <a href="#">Sign up Now!</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
    
//     )
//   }
// }



class SingleItem extends React.Component {
  render() {
    const entry = this.props.entry;
    if (!entry) {
        return (<div className="featured-item"></div>);
    }
    if (entry.styleID.indexOf("/") != -1) {
        entry.styleID = entry.styleID.slice(0,entry.styleID.indexOf("/"));
    }
    return (
      <Link to={`/product/${entry.styleID}/${entry.urlKey}`}>
        <div className="featured-item">
          <img src = {entry.thumbnail} alt="Item 1" />
          <h4>{entry.shoeName}</h4>
          <h6>{"$"+entry.retailPrice}</h6>
        </div>
      </Link>
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
                
                <h1>Results</h1>
              </div>
            </div>
            <div>
                <a href="single-product.html">
                  <div className="single-featured-item">
                    {/* <img src = {entry[0].thumbnail} alt="Item 1" />
                    <h4>{entry[0].shoeName}</h4>
                    <h6>{"$"+entry[0].retailPrice}</h6> */}
                    {entries}
                  </div>
                </a>
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


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {IL: null, keyword: this.props.keyword};
    this.loadData(this.state.keyword);
    this.updateKeyword = this.updateKeyword.bind(this);
  }

  updateKeyword(newKeyword) {
      this.setState({keyword: newKeyword});
      this.loadData(newKeyword);
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

 
 async loadData(keyword) {
   var query = `query {
    searchProduct(message: "${keyword}", count: 63){
      thumbnail shoeName retailPrice styleID urlKey
    }
  }`;

    const responseItems = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
    });

    const resultItems = await responseItems.json();

    this.setState({ IL: resultItems.data.searchProduct });
  }




  render() {
      var searchPage = <React.Fragment>
        <Title />
        <Preheader />
        <Navigation />
        <SearchBar refresher = {this.updateKeyword}/>

        {/* <Banner /> */}
        
        {/* <SingleItem /> */}
        {this.state.IL ? < FeaturedItems data = {this.state.IL} /> : <React.Fragment/>}
        {/* <GetItems /> */}
        <Footer />
        <Subfooter />
      </React.Fragment>
      
      return(
        <React.Fragment>
        {searchPage}
        </React.Fragment>
      )
    }
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export default withRouter(SearchPage);
