var Results = React.createClass({displayName: "Results",

  render: function() {
  	var displayMessage = this.props.message != '' ? 'block' : 'none';
    return React.createElement("div", {className: "results"}, 
    			React.createElement("h3", {style: {display:displayMessage}}, this.props.message), 
    			this.props.children
    		);
  }
});