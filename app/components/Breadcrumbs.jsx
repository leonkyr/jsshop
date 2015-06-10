var React = require("react");

var Breadcrumbs = React.createClass({
  render: function() {
    var crumbs = [
      <li>Home</li>
    ];
    return (
      <ul className="breadcrumbs">
        {crumbs}
      </ul>
    );
  }
});

module.exports = Breadcrumbs;
