var React = require("react");
var Router = require("react-router");
var classSet = require('react/lib/cx');
var State = Router.State;

var NavigationLink = React.createClass({
  propTypes: {
    activeClassName: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired
  },
  getDefaultProps: function () {
    return {
      activeClassName: "active"
    };
  },
  getClassName: function () {
    var classNames = {};

    if (this.props.className) {
      classNames[this.props.className] = true;
    }
    if (this.isActive(this.props.to, this.props.params, this.props.query)) {
      classNames[this.props.activeClassName] = true;
    }

    return classSet(classNames);
  },
  isActive: function(to, params, query){
    // TODO: Fix
    return true;
  },
  render: function() {
    return (
      <li className={this.getClassName()}>
      </li>
    );
  }
});
module.exports = NavigationLink;

