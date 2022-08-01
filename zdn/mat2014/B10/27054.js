CanvasRenderingContext2D.prototype.parallelogram = function(width, height, depth, angle, dottedLine,
	diagonal) {
	if (dottedLine === undefined)
		dottedLine = true;
	if (diagonal === undefined)
		diagonal = false;
	while (angle > Math.PI)
		angle -= Math.PI;
	if (angle === undefined || angle == Math.PI / 2 || angle == 3 * Math.PI / 2)
		angle = Math.PI / 6;
	//третий план
	if (angle > Math.PI / 2 && dottedLine)
		this.setLineDash([0.5, 0.2]);
	this.drawLine(0, 0, 0, height);
	this.setLineDash([]);
	if (angle < Math.PI / 2 && dottedLine)
		this.setLineDash([0.5, 0.2]);
	this.drawLine(width, 0, width, height);
	this.setLineDash([]);
	this.drawLine(0, 0, width, 0);
	this.setLineDash([0.5, 0.2]);
	this.drawLine(0, height, width, height);
	this.setLineDash([]);
	//диагональ
	if (diagonal) {
		this.strokeStyle = '#0099ff';
		this.setLineDash([0.4, 0.1]);
		this.drawLine(0, 0, depth * Math.cos(angle) + width, depth / 2 + height);
		this.setLineDash([]);
		this.strokeStyle = 'black';
	}
	//второй план
	if (angle > Math.PI / 2 && dottedLine)
		this.setLineDash([0.5, 0.2]);
	this.drawLine(0, height, depth * Math.cos(angle), depth / 2 + height);
	this.setLineDash([]);
	if (angle < Math.PI / 2 && dottedLine)
		this.setLineDash([0.5, 0.2]);
	this.drawLine(width, height, depth * Math.cos(angle) + width, depth / 2 + height);
	this.setLineDash([]);
	this.drawLine(0, 0, depth * Math.cos(angle), depth / 2);
	this.drawLine(width, 0, depth * Math.cos(angle) + width, depth / 2);
	//первый план
	this.drawLine(depth * Math.cos(angle), depth / 2, depth * Math.cos(angle), depth / 2 + height);
	this.drawLine(depth * Math.cos(angle) + width, depth / 2, depth * Math.cos(angle) + width, depth / 2 + height);
	this.drawLine(depth * Math.cos(angle), depth / 2, depth * Math.cos(angle) + width, depth / 2);
	this.drawLine(depth * Math.cos(angle), depth / 2 + height, depth * Math.cos(angle) + width, depth / 2 + height);
};

(function() {
	'use strict';
	var v3 = -1;
	var a;
	var b;
	var c;
	var d;
	for (;
		(v3 == -1) || (!v3) && (sl(0, 10));) {
		a = sl(1, 9);
		b = sl(1, 9);
		c = sl(1, 9);
		d = a * a + b * b + c * c;
		v3 = d.isPolnKvadr();
	}
	d = v3 ? d.sqrt() : d;
	var s = 2 * (a * c + a * b + b * c);
	var v1 = sl(0, 3);
	var v2 = slKrome(v1, 0, 3);
	var m = ['площадь поверхности', v3 ? 'диагональ' : 'квадрат диагонали', 'объём',
		'третье выходящее из той же вершины ребро'
	];
	var diag = false;
	if (m[v1] == 'диагональ' || m[v1] == 'квадрат диагонали' || m[v2] == 'диагональ' || m[v2] == 'квадрат диагонали')
		diag = true;
	var n = [s, d, a * b * c, c];
	let paint1 = function(ct) {
		//график
		ct.scale(20, 20);
		ct.lineWidth = 0.1;
		ct.translate(1, 1);
		ct.parallelogram(sl(4, 8), sl(4, 8), sl(4, 8), Math.PI / sl(5, 10), true, diag);
	};
	NAtask.setTask({
		text: 'Два ребра прямоугольного параллелепипеда, выходящие из одной вершины, равны ' + a + ' и ' + b +
			'. ' +
			'Известно, что ' + m[v1] + ' составляет ' + n[v1] + '. ' +
			'Найдите ' + m[v2] + ' параллелепипеда.',
		answers: n[v2],
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 330,
		height: 300,
		paint: paint1,
	});
})();
//27054 5039 26541 27129 72405 72407 72409 72411 72413 72415 72417 72419 
//72421 72423 72425 72427 72429 72431 72433 72435 72437 72439 72441 72443 72445 
//72447 72449 72451 72453 72455 72457 72459 72461 72463 72465 72467 72469 72471 
//72473 72475 72477 72479 72481 72483 72485 72487 72489 72491 72493 72495 72497 
//72499 72501 72503 72505 72507 72509 72511 72513 72515 72517 72519 72521 72523 
//72525 72527 72529 72531 72533 72535 72537
