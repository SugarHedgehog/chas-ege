function sindeg(x){
	//Avoid numeric errors!
	x = x % 360 + 360 * (x < 0);
	switch(x){
		case   0:
		case 180: return 0;
		case  90: return 1;
		case 270: return -1;
		case  30:
		case 150: return 1/2;
		case 330:
		case 210: return -1/2;
	}
	return Math.sin(x * Math.PI / 180);
}

//https://mathjs.org/docs/expressions/customization.html
//https://mathjs.org/docs/expressions/expression_trees.html
sindeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('sin', node, options);
}

function cosdeg(x){
	x = Math.abs(x) % 360;
	switch(x){
		case  90:
		case 270: return 0;
		case   0: return 1;
		case 180: return -1;
		case  60:
		case 120: return 1/2;
		case 300:
		case 240: return -1/2;
	}
	return Math.cos(x * Math.PI / 180);
}

cosdeg.toTex = function (node, options) { //handler function
	return mathjs_helpers.TeXtrigDeg('cos', node, options);
}

math.import({
	sindeg,
	cosdeg,
});
