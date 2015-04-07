var Snack = React.createClass({

  render: function() {
    return <li style={{display : this.props.data.display}}>{this.props.data.type} ({this.props.data.count})</li>;
  }
});