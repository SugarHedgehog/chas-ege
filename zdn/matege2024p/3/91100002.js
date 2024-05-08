(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let pyr = new RegularPyramid({
			height: sl(20, 50),
			baseSide: sl(20, 40),
			numberSide: 4
		});

		pyr.verticesOfFigure.push({
			x: 0,
			y: 0,
			z: pyr.verticesOfFigure[0].z
		});

		let letters = ['A', 'B', 'C', 'D', 'E', 'F'];

		let question = [
			[letters.slice(4, 6).join(''), pyr.height],
			[letters.slice(0, 4).iz() + letters[4], pyr.sideEdge],
			[[letters[0] + letters[2], letters[1] + letters[3]].iz(), pyr.radiusOfCircumscribedCircle],
			
		];

		let strok = [5, 4];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: [1, 2].iz() * Math.PI / 3,
		};

		let point2DPyr = pyr.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(pyr, camera, point2DPyr, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPyr = pyr.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		
		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPyr, [
				[1],
				[strok, strok],
				[1, strok, strok],
				[1, 1, strok, 1, 0, strok],
			]);

			ctx.font = "30px liberation_sans";
			point2DPyr.forEach((elem, i) => ctx.fillText(letters[i], elem.x, elem.y + ((i != point2DPyr.length - 2) ? 15 : -
				10)));
		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде $ABCDE$ с вершиной $E$, точка $F$ – центр основания, $' + [question[
					0][0], question[0][1].pow(2).texsqrt(1)].join('=') + '$, ' +
				'$' + [question[1][0], question[1][1].pow(2).texsqrt(1)].join('=') + '$. Найдите длину отрезка $' + question[2]
				[0] + '$.',
			answers: question[2][1],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//911 912 913 914 915 284350 284348 284365 284467 284367 284369 284371 284373 284375 284377 284379 284381 284383 284385 284387 284389 284391 284393 284395 284397 284399 284401 284403 284405 284407 284409 284411 284413 284415 284417 284419 284421 284423 284425 284427 284429 284431 284433 284435 284437 284439 284441 284443 284445 284447 284449 284451 284453 284455 284457 284459 284461 284463 284465 284349 284571 284469 284471 284473 284475 284477 284479 284481 284483 284485 284487 284489 284491 284493 284495 284497 284499 284501 284503 284505 284507 284509 284511 284513 284515 284517 284519 284521 284523 284525 284527 284529 284531 284533 284535 284537 284539 284541 284543 284545 284547 284549 284551 284553 284555 284557 284559 284561 284563 284565 284567 284569 284675 284573 284575 284577 284579 284581 284583 284585 284587 284589 284591 284593 284595 284597 284599 284601 284603 284605 284607 284609 284611 284613 284615 284617 284619 284621 284623 284625 284627 284629 284631 284633 284635 284637 284639 284641 284643 284645 284647 284649 284651 284653 284655 284657 284659 284661 284663 284665 284667 284669 284671 284673
