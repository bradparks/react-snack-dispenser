var Results = React.createClass({

  render: function() {
  	var displayMessage = this.props.message != '' ? 'block' : 'none';
    return <div className="results">
    			<h3 style={{display:displayMessage}}>{this.props.message}</h3>
    			{this.props.children}
    		</div>;
  }
});