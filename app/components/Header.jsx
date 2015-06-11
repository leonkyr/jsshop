var React = require("react");
var Router = require("react-router");
var Navigation = require("./Navigation.jsx");
var Breadcrumbs = require("./Breadcrumbs.jsx");
var Link = Router.Link;

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <div className="row logo-bar">
          <div className="xxlarge-3 xlarge-3 large-3 medium-3 columns">
            <Link to="/"><img src="/logo.png" /></Link>
          </div>
          <div className="xxlarge-9 xlarge-9 large-9 medium-9 columns">
            
          </div>
        </div>
        <Navigation to="#abc"/>
        <Breadcrumbs/>
      </header>
    );
  }
});

module.exports = Header;
