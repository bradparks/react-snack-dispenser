var Stats = React.createClass({displayName: "Stats",
	
	
	
  render: function() {
  	if(this.props.snacks){
		snackData = this.props.snacks.map(function (snack,index) {
      return (React.createElement(Snack, {key: snack.type, data: snack}, snack.type, ": ", React.createElement("span", {className: "count"}, snack.count)));
   	 });
	}
    return React.createElement("div", {className: "stats"}, 
    			React.createElement("h2", null, "Snack Dispenser Inventory"), 
    			React.createElement("ul", null, 
    				snackData
    			)
    		);
  }
});