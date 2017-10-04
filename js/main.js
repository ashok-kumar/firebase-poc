require.config({
	paths: {
		jquery: 'lib/jquery',
		firebaseLib: 'lib/firebase-v4'
	}
});

require([
	'views/app'
], function(TestApp) {
	
	var testObj = new TestApp();
	
	testObj.initialize();

});
