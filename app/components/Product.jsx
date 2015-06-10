var React = require('react');

var Product = React.createClass({
  render: function(){
  	 var styles = {
      uList: {
        paddingLeft: 0,
        listStyleType: "none"
      },
      listGroup: {
        margin: '5px 0',
        borderRadius: 5
      },
      removeItem: {
        fontSize: 20,
        float: "left",
        position: "absolute",
        top: 12,
        left: 6,
        cursor: "pointer",
        color: "rgb(222, 79, 79)"
      },
      productItem: {
        paddingLeft: 20,
        fontSize: 17
      }
    };
    var listItems = this.props.items.map(function(item, index){
     	return (
        	<li key={index} className="list-group-item" style={styles.listGroup}>
          		<span style={styles.productItem}>
            		{item}
          		</span>
        	</li>
      		)
    	}.bind(this));
    return (
    	<ul style={styles.uList}>
        	{listItems}
    	</ul>
    )
  }
});

module.exports = Product;