(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let A = math.matrix([sl(-20, 20), sl(-20, 20)]);
		let B = math.matrix([sl( -20, 20), sl(-20, 20)]);
		
		NAtask.setTask({
			text: A+B+'<br>'+
			math.add(A,B),
			answers: 0,
			analys: '',
		});
	}, 1000);
})();
