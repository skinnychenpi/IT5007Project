import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/fontawesome.css';
import './assets/css/tooplate-main.css';
import './assets/css/searchpage.css';
import reportWebVitals from './reportWebVitals';
import {Link, Redirect, withRouter, NavLink} from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import loading from './loading2.svg';

// Title
class Title extends React.Component {
    render(){
      return (
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content />
          <meta name="author" content />
          <title>Product details</title>
        </div>
      )
    }
  }

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
  class Itemdetails extends React.Component {
      render (){
        const data = this.props.data;
          return (
        <div class="single-product">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="section-heading">
                    <div class="line-dec"></div>
                    <h1>Details</h1>
                  </div>
                </div>
                
                  <div class="productimage">
                  <img src = {data.thumbnail} alt="Item 1" />
                  </div>
                
                
                  <div class="right-content">
                    <h4>{data.shoeName}</h4>
                    <h6>{"$"+data.retailPrice}</h6>
                    <p>{data.description}</p>
                    <div className="platformsprice">
                        <p>(Click the Platform's name to go to this item's weblink)</p>
                        <p className="stockx"><a href={data.resellLinks.stockX}>StockX  </a><strong>{"$"+data.lowestResellPrice.stockX}</strong></p>
                        <p className="goat"><a href={data.resellLinks.goat}>Goat    </a><strong>{"$"+data.lowestResellPrice.goat}</strong></p>
                        <p className="flightClub"><a href={data.resellLinks.flightClub}>FlightClub    </a><strong>{"$"+data.lowestResellPrice.flightClub}</strong></p>
                    </div>
                    
                    <div class="down-content">
                      
                      <div class="share">
                        <h6> <i>Outside website homePage </i></h6>
                            <span>
                            <a href="https://stockx.com/" ><img src={require("./assets/images/stockX.png").default} alt="" /></a>
                            <a href="https://www.goat.com/"><img src={require("./assets/images/goat.png").default} alt="" /></a>
                            <a href="https://www.flightclub.com/"><img src={require("./assets/images/flightClub.png").default} alt="" /></a></span>
                      </div>
                    </div>
                  </div>
                
              </div>
            </div>
          </div>
          )
      }
  }


  class SizeTableRow extends React.Component {
    render() {
        const entry = this.props.prices;
        const sizes = this.props.sizes;
        const platform = this.props.platform;
        
        var prices = [];
        for (let i = 0; i < sizes.length; i++) {
            var sz = sizes[i];
            if (!(sz in entry)) prices.push("NA");
            else prices.push(entry[sz]);
        }

        const pricesRow = prices.map(price => <SizeTableUnit data = {price} />);

        return (
        <tr>
            <td> {platform} </td>
            {pricesRow}
        </tr>
    );
    }
}

class SizeTableUnit extends React.Component {
    render() {
        const price = this.props.data;
        return (
            <td>{price}</td>
        );
    }
}

class SizeTableHeader extends React.Component {
    render() {
        const size = this.props.data;
        // Do ISODateTime data conversion:
        return (
        <th>{size}</th>
    );
    }
}

class SizeTable extends React.Component {
    convert(data) {
        var convertedData = {stockX:{}, goat:{}, flightClub:{}, sizes:[]};
        var stockXData = data.resellPrices.stockX;
        var goatData = data.resellPrices.goat;
        var flightClubData = data.resellPrices.flightClub;
        for (let i = 0; i < stockXData.sizes.length; i++) {
            var size = parseFloat(stockXData.sizes[i]);
            convertedData.stockX[size] = stockXData.prices[i];
            if (!convertedData.sizes.includes(size)) convertedData.sizes.push(size);
        }

        for (let i = 0; i < goatData.sizes.length; i++) {
            var size = parseFloat(goatData.sizes[i]);
            convertedData.goat[size] = goatData.prices[i];
            if (!convertedData.sizes.includes(size)) convertedData.sizes.push(size);
        }

        for (let i = 0; i < flightClubData.sizes.length; i++) {
            var size = parseFloat(flightClubData.sizes[i]);
            convertedData.flightClub[size] = flightClubData.prices[i];
            if (!convertedData.sizes.includes(size)) convertedData.sizes.push(size);
        }

        convertedData.sizes.sort(function(a, b){return a-b});
        return convertedData;

    }

    render() {
        const data= this.props.data;
        let convertedData = this.convert(data);
        const stockXRows =  <SizeTableRow sizes={convertedData.sizes} prices={convertedData.stockX} platform = {"stockX"} /> ;
        const goatRows = <SizeTableRow sizes={convertedData.sizes} prices={convertedData.goat} platform = {"Goat"}/> ;
        const flightClubRows = <SizeTableRow sizes={convertedData.sizes} prices={convertedData.flightClub} platform = {"FlightClub"}/> ;
        const headers = convertedData.sizes.map(size => <SizeTableHeader data = {size} />);
        return (
        <div className = "WLtable">
            <table>
                <thead>
                    <th>Platform\Sizes</th>
                    {headers}
                </thead>
                <tbody id = "myTbody">
                    {stockXRows}
                    {goatRows}
                    {flightClubRows}
                </tbody>
            </table>
        </div>
        );
    }
}



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
            </div>
          </div>
        </div>
      )
  
      
    }
  }
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



class Loading extends React.Component {
    render() {
        return (
            <React.Fragment>
            <img src={loading} className="loading" alt="loading" />
            </React.Fragment>
        )
    }
}



class DetailPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {styleID: this.props.styleID, urlKey: this.props.urlKey, data: null};
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

    // Deatails
    var query =`query {
        getProductDetail(styleID: "${this.state.styleID}", urlKey: "${this.state.urlKey}") {
            resellLinks  {stockX goat flightClub}
            lowestResellPrice  {stockX goat flightClub}
            shoeName
            retailPrice
            thumbnail
            description
            resellPrices{
                stockX{sizes
                prices}
                
                goat{sizes
                prices}
                flightClub{sizes
                prices}
              }
            }

    }`  

    
    const responsedetails = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ query })
      });
  
      const resultdetails = await responsedetails.json();
      
      this.setState({ data: resultdetails.data.getProductDetail });

    }




    render() {
        var homePage = <React.Fragment>
          <Title />
          <Preheader />
          <Navigation />
          
          
          {/* <SingleItem /> */}
          {this.state.data ? < Itemdetails data = {this.state.data}/> : <Loading/>}
          {/* Size Table */}
          {this.state.data ? < SizeTable data = {this.state.data} />: <React.Fragment/>}
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

export default withRouter(DetailPage);