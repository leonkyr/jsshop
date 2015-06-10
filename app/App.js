var React = require('react');
var ProductList = require('./components/ProductList');
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Components
var Header = require("./components/Header");
var Footer = require("./components/Footer");

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <Header/>
          <div className="main">
            <RouteHandler />
          </div>
        <Footer/>
      </div>
    )
  }
});

React.render(
	<App />, 
	document.getElementById('mount-point')
);