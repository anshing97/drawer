/* drawer interaction */ 

function Drawer(element) {

  var $element = $(element);

  var RESTING = 0; 
  var COLLAPSED = 1; 
  var EXPANDED = 2; 

  var state = RESTING; 
  var timeout; 

  this.init = function () {
  	bounceDrawer(); 
  };

  function bounceDrawer () {
  	$element.animate({"height":90},350,function(){
  		state = RESTING; 
  	});
  };  

  function showRestingTimeout() {
  	timeout = setTimeout(showResting,3000);
  };

  function cancelRestingTimeout() {
  	clearInterval(timeout);
  };

  function showExpanded () {
  	$element.animate({"height":250},350,function(){
  		state = EXPANDED;
  	});
  };

  function showCollapsed () {
  	$element.animate({"height":20},350,function(){
  		state = COLLAPSED;
  		showRestingTimeout();
  	});
  };

  function showResting () {
  	$element.animate({"height":90},350,function(){
  		state = RESTING; 
  	});
  };

  function handleHammer(ev) {

    // disable browser scrolling
    ev.gesture.preventDefault();

    switch(ev.type) {
	    case 'dragup':
	    case 'dragdown':
	    	cancelRestingTimeout();
	    	console.log("dragging");
	      break;

	    case 'swipeup':

	    	console.log("Swipe up");

	      ev.gesture.stopDetect();

	    	if ( state == RESTING ) {
	    		showExpanded(); 
	    	} else if ( state == COLLAPSED ) {
	    		showResting();
	    	}
	      break;

	    case 'swipedown':

	    	console.log("Swipe down");

	    	ev.gesture.stopDetect();

	    	if ( state == EXPANDED ) {
	    		showResting(); 
	    	} else if ( state == RESTING ) {
	    		showCollapsed();
	    	}

	      break;

	    case 'release':
	    	console.log("release");
	      break;
    }
  }

  var options = { dragLockToAxis: false };
  new Hammer($element,options).on("release dragup dragdown swipeup swipedown", handleHammer);
}

// prevent webview from bouncing 
document.ontouchmove = function(event){
   event.preventDefault();
}

// ready 
$(function() {
	var drawer = new Drawer("footer");

	setTimeout(drawer.init,1500);
});