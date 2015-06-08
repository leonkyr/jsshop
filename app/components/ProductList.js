var React = require('react');
var Product = require('./Product');
var testStore = require('../stores/testStore');
var testActions = require('../actions/testActions');

var ProductList = React.createClass({
	getInitialState: function(){
	    return {
	      list: testStore.getList()
	    }
  	},
  	componentDidMount: function(){
    	testStore.addChangeListener(this._onChange);
  	},
  	componentWillUnmount: function(){
    	testStore.removeChangeListener(this._onChange);
  	},
  	handleAddItem: function(newItem){
    	testActions.addItem(newItem);
  	},
  	handleRemoveItem: function(index){
    	testActions.removeItem(index);
  	},
  	_onChange: function(){
    	this.setState({
      		list: testStore.getList()
    	})
  	},
  	render: function(){
    return (
      	<div className="col-sm-6 col-md-offset-3">
        	<div className="col-sm-12">
          		<h3 className="text-center"> Product List </h3>
          		<Product items={this.state.list} remove={this.handleRemoveItem}/>
        	</div>
      	</div>
    )
  }
});

module.exports = ProductList;