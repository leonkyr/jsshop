var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var ImmutableRenderMixin = require("react-immutable-render-mixin");

var Breadcrumbs = React.createClass({
  render: function() {
    var crumbs = [];

    return (
      <ul className="breadcrumbs">
        {crumbs}
      </ul>
    );
  };
});

module.exports = Breadcrumbs;
