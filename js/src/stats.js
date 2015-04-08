var Stats = React.createClass({
	
	
	
  render: function() {
  	if(this.props.snacks){
		snackData = this.props.snacks.map(function (snack,index) {
      return (<Snack key={snack.type} data={snack}>{snack.type}: <span className="count">{snack.count}</span></Snack>);
   	 });
	}
    return <div className="stats">
    			<h2>Snack Dispenser Inventory</h2>
    			<ul>
    				{snackData}
    			</ul>
    		</div>;
  }
});