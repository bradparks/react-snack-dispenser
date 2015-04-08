var Dispenser = React.createClass({displayName: "Dispenser",
  getInitialState : function(){
  	return {"snacks" : [{"type": "Doritos", "count" : this.generateRandomNumber(1,5), "stash_count":0, "imgSrc" : 'images/doritos.gif'},
       		{"type": "Reeses", 	 "count" : this.generateRandomNumber(1,5), "stash_count":0,"imgSrc" : 'images/reeses2.png'},
       		{"type": "Dr. Pepper", "count" : this.generateRandomNumber(1,5), "stash_count":0,"imgSrc" : 'images/drpepper2.png'},
       		{"type": "Apples", 	 "count" : this.generateRandomNumber(1,5), "stash_count":0,"imgSrc" : 'images/apple2.png'}
       	],"selectedSnack" : -1,"displayedSnack": -1,"snackMessage" : ""};
  },
 	
  generateRandomNumber : function(startNumber,count){
  		var randomNumber = Math.floor((Math.random() * count) + startNumber);
  		return randomNumber;
  },
  
  /* Visually shuffle the snacks (slot machine effect)*/
  shuffleSnacks : function(){
    this.reset();
    /* How many times to shuffle through the snacks */
    var shuffleStart = 0;
    var shuffleEnd = this.generateRandomNumber(5,10);
    
    var intervalId = setInterval(function(){
        if (++shuffleStart === shuffleEnd) {
          window.clearInterval(intervalId);
          this.displaySnackMessage();
        }else{
          var displayedSnackInteger = this.generateRandomNumber(0,this.state.snacks.length);
          this.setState({displayedSnack : displayedSnackInteger});
        }
        
    }.bind(this),500);  
  	
  },
  displaySnackMessage : function(){
    var displaySnackIndex = this.state.displayedSnack;
    var currentSnacks = this.state.snacks;
    if(currentSnacks[displaySnackIndex].count == 0){
        this.setState({snackMessage : "Sorry, try again. The snack dispenser is out of "+currentSnacks[displaySnackIndex].type+"."});
    }else{
        this.setState({selectedSnack: displaySnackIndex,snackMessage : "Would you like "+currentSnacks[displaySnackIndex].type+"?"});
    }
  },
  takeSnack : function() {
	  var currentSnacks = this.state.snacks;
  	var selectedSnack = this.state.selectedSnack;
  	currentSnacks[selectedSnack].count--;
    currentSnacks[selectedSnack].stash_count++; 	
  	this.setState({snacks : currentSnacks},function(){
        this.reset();
    });
  },
  reset : function(){
  	this.setState({snackMessage:"",displayedSnack : -1,selectedSnack: -1})
  },
  render: function() {
    var displayedSnackIndex = this.state.displayedSnack;
  	var selectSnackButton = this.state.selectedSnack == -1 ? "block" : "none";
    var takeItOrLeaveItButtons = this.state.selectedSnack == -1 ? "none" : "block";
     
	  var snacks = this.state.snacks.map(function (snack,index) {
      var snackOpacity = 0;
      if(displayedSnackIndex == index){   
        snackOpacity = 1;
      }
      return (
        React.createElement(Snack, {key: snack.type, data: snack}, 
          React.createElement("img", {style: {opacity : snackOpacity}, src: snack.imgSrc})
        )
          
      );
    });
    return React.createElement("div", null, 

      				React.createElement("div", {className: "dispenser-container"}, 
    			    		React.createElement("ul", {id: "snacks", className: "snacks", ref: "snackOptions"}, 
    			    			snacks
    			    		), 
        	    		React.createElement("div", {className: "buttons", style: {display:selectSnackButton}}, 
        	    			React.createElement("button", {className: "btn", onClick: this.shuffleSnacks}, "Gimme a Snack!")
        	    		), 
        	    		
                  React.createElement(Results, {message: this.state.snackMessage}, 
                      React.createElement("div", {className: "buttons", style: {display:takeItOrLeaveItButtons}}, 
                        React.createElement("button", {className: "btn purple", onClick: this.takeSnack}, "Take it"), 
                        React.createElement("div", null, "OR"), 
                        React.createElement("button", {className: "btn", onClick: this.reset}, "Leave it")
                      )
                  )
                ), 
                React.createElement("div", {className: "data-container"}, 
                   React.createElement(Stats, {snacks: this.state.snacks}), 
                   React.createElement(Stash, {snacks: this.state.snacks}), 
                   React.createElement("div", {className: "clear"})
               )
    	     );
  }
});

React.render( React.createElement(Dispenser, null),document.getElementById('dispenser'));