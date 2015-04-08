var Snack = React.createClass({displayName: "Snack",

  render: function() {
    return React.createElement("li", null, this.props.children);
  }
});