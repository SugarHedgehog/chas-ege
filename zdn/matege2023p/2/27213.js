(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);

			let stroke = [4, 5];

			let matrixConnections = {
				0: [
					[1, stroke],
					[3, stroke],
					[12, stroke]
				],
				1: [9, 15, 17],
				2: [
					[1, stroke],
					[3, stroke],
					[20, stroke]
				],
				4: [
					[3, stroke], 5, 7
				],
				6: [5, 7, 15],
				8: [
					[0, stroke], 9, 13
				],
				12: [5, 13, 15],
				14: [9, 13, 15],
				18: [
					[2, stroke], 17, 23
				],
				20: [7, 15, 23],
				22: [15, 17, 23],
			};

			let par1 = new Parallelepiped({
				depth: sl(10, 20),
				height: sl(15, 20),
				width: sl(10, 20),
			});

			let par2 = new Parallelepiped({
				depth: sl(8, 15),
				height: sl(5, par1.height - 5),
				width: par1.width,
			});

			let par3 = new Parallelepiped({
				depth: par1.depth,
				height: par2.height,
				width: sl(5, 10),
			});

			let vertex3D = par1.verticesOfFigure.concat(par2.verticesOfFigure.map((elem) => shiftCoordinate3D(elem, {
				x: 0,
				y: -0.5 * (par1.depth + par2.depth),
				z: 0.5 * (par1.height - par2.height),
			}))).concat(par3.verticesOfFigure.map((elem) => shiftCoordinate3D(elem, {
				x: -0.5 * (par1.width + par3.width),
				y: 0,
				z: 0.5 * (par1.height - par3.height),
			})));

			vertex3D = vertex3D.map((elem) => shiftCoordinate3D(elem, {
				x: 0.5 * par3.width,
				y: 0,
				z: 0,
			}));

			let camera = {
				x: 0,
				y: 0,
				z: 0,
				scale: 1,

				rotationX: -Math.PI / 2 + Math.PI / 14,
				rotationY: [Math.PI / sl(3, 10).pm(), 0][1],
				rotationZ: Math.PI / sl(10, 14),
			};

			let point2D = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));

			autoScale(vertex3D, camera, point2D, {
				startX: -160,
				finishX: 160,
				startY: -160,
				finishY: 160,
				maxScale: 100,
			});

			point2D = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));
			genAssert((point2D[12].y - point2D[3].y).abs() > 20);
			genAssert((point2D[13].y - point2D[3].y).abs() > 20);
			let rand = sl1();

			let paint1 = function(ctx) {
				let h = 400;
				let w = 400;
				ctx.translate(w / 2, h / 2);
				ctx.lineWidth = 2;
<<<<<<< HEAD
				ctx.strokeStyle = om.secondaryBrandColors;
				ctx.drawFigureVer2(point2D, matrixConnections);
=======
				let koefA = (a > 11 && c > 10) ? 10 : 15;
				a *= koefA;
				f *= koefA;
				let depth = 80;
				c *= koefA;
				angle = -Math.PI - Math.PI / 3;
				ctx.drawParallelepiped({
					width: a,
					height: c,
					depth: depth,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 3, 4], false, [4, 5]);


				ctx.translate(0, c);
				ctx.drawParallelepiped({
					width: a,
					height: c,
					depth: depth * 2,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 1, 2, 3, 4, 5, 6], false, [4, 5]);


				ctx.translate(depth * (angle).cos(), -depth * (angle).cos());
				ctx.drawParallelepiped({
					width: a,
					height: c,
					depth: depth,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 1, 2, 3, 4, 8, 9, 10, 11], false, [0, 0]);

				ctx.translate(a - depth * (angle).cos(), depth * (angle).cos());
				ctx.drawParallelepiped({
					width: f,
					height: c,
					depth: depth,
					angle: angle,
					strokeStyle: "#809DF2",
				}, [0, 3, 4, 6], false, [4, 5]);

				//возрат к начальной точке
				ctx.translate(0, -c);
				ctx.translate(-depth * (angle).cos(), depth * (angle).cos());
				ctx.translate(-a + depth * (angle).cos(), -depth * (angle).cos());

				//цифорки
				ctx.beginPath();
				ctx.font = "20px serif";
				ctx.fillText((a / koefA).toString(), a / 2, -5, 15); //a
				ctx.stroke();
				ctx.moveTo(0, 0);
				ctx.fillText((b).toString(), depth * (angle).cos() / 2 - 18, -depth * (angle).cos() / 2, 15); //b
				ctx.fillText((c / koefA).toString(), depth * (angle).cos() - 18, c / 2 - depth * (angle).cos(), 15); //c
				//ctx.lineTo(depth * (angle).cos(), c - depth * (angle).cos()); //c

				ctx.stroke();

				ctx.beginPath();
				ctx.translate(depth * (angle).cos(), c - depth * (angle).cos());
				ctx.moveTo(0, 0);
				ctx.fillText((d).toString(), depth * (angle).cos() / 2 - 15, -depth * (angle).cos() / 2, 15); //d
				ctx.stroke();

				ctx.beginPath();
				ctx.translate(depth * (angle).cos(), -depth * (angle).cos());
				ctx.moveTo(0, 0);
				ctx.fillText((k).toString(), -18, c / 2, 15); //k
				ctx.fillText((f / koefA).toString(), a - depth * (angle).cos() + f / 2, c / 4 - c * (angle).cos(), 15); //k
				ctx.stroke();

>>>>>>> 131829577 ([zdn] [fix] - more color)

				ctx.font = "20px liberation_sans";
				ctx.signSegmentInMiddle(point2D[8].x, point2D[8].y, point2D[13].x, point2D[13].y, par2.height, -22, 20);
				ctx.signSegmentInMiddle(point2D[7].x, point2D[7].y, point2D[20].x, point2D[20].y, par1.height - par2.height, -5,
					20);
				ctx.signSegmentInMiddle(point2D[8].x, point2D[8].y, point2D[9].x, point2D[9].y, par2.width, 20, 20);
				ctx.signSegmentInMiddle(point2D[1].x, point2D[1].y, point2D[17].x, point2D[17].y, par3.width, 20, 20);
				ctx.signSegmentInMiddle(point2D[5].x, point2D[5].y, point2D[4].x - 20, point2D[4].y + 20, par1.depth, -15, 20);
				ctx.signSegmentInMiddle(point2D[13].x, point2D[13].y, point2D[12].x - 20, point2D[12].y + 20, par2.depth, -15,
					20);

			};
			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: [par1.surfaceArea + par2.surfaceArea + par3.surfaceArea - 2 * par1.height * par1.width - 2 * par1.height *
					par1.depth, par1.volume + par2.volume + par3.volume
				][rand],
			});
<<<<<<< HEAD
=======
			NAtask.modifiers.multiplyAnswerBySqrt(3);
>>>>>>> 131829577 ([zdn] [fix] - more color)
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27193 25671 25673 25675 25677 25679
