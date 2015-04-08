var Stash = React.createClass({displayName: "Stash",
	
	
	
  render: function() {
  	if(this.props.snacks){
    snackData = this.props.snacks.map(function (snack,index) {
      return (React.createElement(Snack, {key: snack.type, data: snack}, snack.type, ": ", React.createElement("span", {className: "count"}, snack.stash_count)));
     });
  }
    return React.createElement("div", {className: "stash"}, 
    			React.createElement("h2", null, "My Stash"), 
    			React.createElement("ul", null, 
    				snackData
    			)
    		);
  }
});