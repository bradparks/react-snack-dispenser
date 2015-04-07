var Dispenser = React.createClass({
  getInitialState : function(){
  	return {"snacks" : [{"type": "Pretzels", "count" : this.generateRandomNumber(1,5), "imgSrc" : 'images/pretzels.jpg', "display" : "none"},
       		{"type": "Reeses", 	 "count" : this.generateRandomNumber(1,5), "imgSrc" : 'images/reeses.gif', "display" : "none"},
       		{"type": "Dr. Pepper", "count" : this.generateRandomNumber(1,5), "imgSrc" : 'images/drpepper.png', "display" : "none"},
       		{"type": "Apples", 	 "count" : this.generateRandomNumber(1,5), "imgSrc" : 'images/apple.jpg', "display" : "none"}
       	],"selectedSnack" : -1,"displayedSnack": -1,"snackMessage" : ""};
  },
 	
  generateRandomNumber : function(startNumber,count){
  		var randomNumber = Math.floor((Math.random() * count) + startNumber);
  		return randomNumber;
  },
  selectRandomSnack: function(){
    
    this.shuffleSnacks();
    
  	/*var displaySnackInteger = this.state.displayedSnack;
  	var currentSnacks = this.state.snacks;
    if(displaySnackInteger != -1){
        if(currentSnacks[displaySnackInteger].count == 0){
        alert('you lose. No more '+currentSnacks[selectedSnackInteger].type+' left.');
      }else{
        this.setState({selectedSnack : displaySnackInteger});
      }
    }*/
  	
 	
  },

  /* Visually shuffle the snacks (slot machine effect)*/
  shuffleSnacks : function(){
    this.reset();
    /* How many times to shuffle through the snacks */
    var shuffleStart = 0;
    var shuffleEnd = this.generateRandomNumber(1,20);
    
    var intervalId = setInterval(function(){
        if (++shuffleStart === shuffleEnd) {
          window.clearInterval(intervalId);
          this.displaySnackMessage();
        }else{
          var displayedSnackInteger = this.generateRandomNumber(0,this.state.snacks.length);
          this.setState({displayedSnack : displayedSnackInteger},function(){
            console.log('finished setting displayed snack state');
          });
        }
        
    }.bind(this),200);  
  	
  },
  displaySnackMessage : function(){
    var displaySnackIndex = this.state.displayedSnack;
    var currentSnacks = this.state.snacks;
    if(currentSnacks[displaySnackIndex].count == 0){
        this.setState({snackMessage : "Sorry, try again. The snack machine is out of "+currentSnacks[displaySnackIndex].type+"."});
    }else{
        this.setState({selectedSnack: displaySnackIndex,snackMessage : "Would you like "+currentSnacks[displaySnackIndex].type+"?"});
    }
  },
  takeSnack : function() {
	  var currentSnacks = this.state.snacks;
  	var selectedSnack = this.state.selectedSnack;
  	currentSnacks[selectedSnack].count--; 	
  	this.setState({snacks : currentSnacks},function(){
        this.reset();
    });
  },
  reset : function(){
  	this.setState({snackMessage:"",displayedSnack : -1,selectedSnack: -1})
  },
  render: function() {
  	var selectSnackButton = this.state.selectedSnack == -1 ? "block" : "none";
  	var takeItOrLeaveItButtons = this.state.selectedSnack == -1 ? "none" : "block";
    var displayedSnackInteger = this.state.displayedSnack;
	 var snacks = this.state.snacks.map(function (snack,index) {
      if(displayedSnackInteger == index){
        snack.display = "list-item";
      }else{
        snack.display = "none";
      }
      return (
        <Snack key={snack.type} ref={snack.type} data={snack}/>
          
      );
    });
    return <div>

  				<div id="snacks-outer-container">
  					<div id="snacks-inner-container">
  			    		<ul id="snacks" className="snacks" ref="snackOptions">
  			    			{snacks}
  			    		</ul>
  		    		</div>
  	    		</div>
            <h2>{this.state.snackMessage}</h2>
  	    		<div className="buttons" style={{display:selectSnackButton}}>
  	    			<button className="btn" onClick={this.shuffleSnacks} >Gimme a Snack!</button>
  	    		</div>
  	    		<div className="buttons" style={{display:takeItOrLeaveItButtons}}>
  		    		<button className="btn purple" onClick={this.takeSnack}>Take it</button>
  		    		&nbsp;OR&nbsp;
  		    		<button className="btn" onClick={this.reset}>Leave it</button>
  	    		</div>
    	  </div>;
  }
});