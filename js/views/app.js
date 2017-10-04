define([
	'jquery',
	'firebaseLib'
], function( $, firebaseLib) {

	var TestApp = function(params){
		this.params = params || {};
	};

	TestApp.prototype.initialize = function(){
		
		// Initialize Firebase
        var self = this,
        	config = {
	          apiKey: "AIzaSyBvu2PyM2ZBC8db8GeHOOU3r_tvvFUqTs0",
	          authDomain: "test-notify-28112.firebaseapp.com",
	          databaseURL: "https://test-notify-28112.firebaseio.com",
	          projectId: "test-notify-28112",
	          storageBucket: "",
	          messagingSenderId: "478102603833"
	        };
        firebase.initializeApp(config);

		var unsubscribeStateListener = firebase.auth().onAuthStateChanged(function(user) {
	         if (user) {
	             
	             console.debug('onAuthStateChanged: User session is available');
	             
	                  var summaryNodeReference = firebase.database().ref('fname');
	                  summaryNodeReference.on('value', function(snapshot) {
	                      $('#firstName').text(snapshot.val());
	                  });
	                  
	                  firebase.database().ref('lname').on('value', function(snapshot) {
	                      $('#lastName').text(snapshot.val());
	                  });

	                  firebase.database().ref('fnameCount').on('value', function(snapshot) {
	                      $('.fbadge').text(snapshot.val());
	                  });
	                  firebase.database().ref('lnameCount').on('value', function(snapshot) {
	                      $('.lbadge').text(snapshot.val());
	                  });
	             
	                  unsubscribeStateListener();  
	         } else {
	              console.debug('onAuthStateChanged: User session is not available');
	              self.authenticate();
	         }
	     });	

		$(document).ready(function () {
	        $('.update').click(function () {
	            self.updateData();
	        });
	        $('.signout').click(function () {
	            self.signOut();
	        });
	    });
	};

	TestApp.prototype.authenticate = function(){
		firebase.auth().signInWithEmailAndPassword('ashok@ashok.com', 'test123').then(function(){
          	console.debug('--- Logged ---');
      	});          
	};

	TestApp.prototype.updateData = function(){
		if($('#fName').val()){
	        firebase.database().ref('fname').set($('#fName').val());
	        firebase.database().ref('fnameCount').set(Number($.trim($('.fbadge').text())) + 1);  
	    }
	    if($('#lName').val()){
	        firebase.database().ref('lname').set($('#lName').val());            
	        firebase.database().ref('lnameCount').set(Number($.trim($('.lbadge').text())) + 1);
	    }
	};

	TestApp.prototype.signOut = function(){
		firebase.auth().signOut()
	    .then(function(){
	        console.debug("Firebase signout success - ");
	        $('#firstName').text('');
	        $('#lastName').text('');
	        $('.fbadge').text(0);
	        $('.lbadge').text(0);
	    })
	    .catch(function(error){
	        console.debug("Firebase signout failure - ");
	    }); 
	};

	

	return TestApp;
});
