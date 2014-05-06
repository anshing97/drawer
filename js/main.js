/* drawer interaction */ 

function Drawer(element) {

  var $element = $(element);

  var RESTING = 0; 
  var COLLAPSED = 1; 
  var EXPANDED = 2; 

  var state = RESTING; 
  var timeout; 

  function showRestingTimeout() {
  	timeout = setTimeout(showResting,3000);
  }

  function cancelRestingTimeout() {
  	clearInterval(timeout);
  }

  function showExpanded () {
  	$element.animate({"height":250},350,function(){
  		state = EXPANDED;
  	});
  };

  function showCollapsed () {
  	$element.animate({"height":10},350,function(){
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

  new Hammer($element, { dragLockToAxis: true }).on("release dragup dragdown swipeup swipedown", handleHammer);
}


$(function() {


	var drawer = new Drawer("footer");



});