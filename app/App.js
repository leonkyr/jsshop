var React = require('react');
var ProductList = require('./components/ProductList');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <ProductList />
        </div>
      </div>
    )
  }
});

React.render(
	<App />, 
	document.getElementById('mount-point')
);