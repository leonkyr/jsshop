var React = require('react');
var ProductList = require('./components/ProductList.jsx');
// var Router = require("react-router");
// var RouteHandler = Router.RouteHandler;

// Components
var Header = require("./components/Header.jsx");
var Footer = require("./components/Footer.jsx");

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        // <Header/>
          <div className="main">
            <ProductList />
            // <RouteHandler />
          </div>
        // <Footer/>
      </div>
    )
  }
});

React.render(
	<App />, 
	document.getElementById('mount-point')
);