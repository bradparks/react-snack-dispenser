var Results = React.createClass({

  render: function() {
    return <div className="results" style={{display : this.props.showResults}}>
    			<h3>{this.props.message}</h3>
    			{this.props.children}
    		</div>;
  }
});