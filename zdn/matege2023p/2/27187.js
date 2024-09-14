(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
<<<<<<< HEAD

			let stroke = [4, 5];

			let matrixConnections = {
				0: [1, [3, stroke], 13],
				2: [1, [3, stroke], 7],
				6: [1, 7, 9],
				10: [7, 9, 15],
				12: [
					[3, stroke], 13, 15
				],
				14: [9, 13, 15],
			};

			let par1 = new Parallelepiped({
				depth: sl(10, 20),
				height: sl(5, 20),
				width: sl(10, 20),
			});

			let par2 = new Parallelepiped({
				depth: par1.depth,
				height: sl(5, 20),
				width: slKrome(par1.width, 5, par1.width - 5),
			});

			let vertex3D = par1.verticesOfFigure.concat(par2.verticesOfFigure.map((elem) => shiftCoordinate3D(elem, {
				x: 0.5 * (par1.width - par2.width),
				y: 0,
				z: -0.5 * (par1.height + par2.height),
			})));

			vertex3D = vertex3D.map((elem) => shiftCoordinate3D(elem, {
				x: 0,
				y: 0,
				z: 0.5 * par2.height,
			}));

			let camera = {
				x: 0,
				y: 0,
				z: 0,
				scale: 1,

				rotationX: -Math.PI / 2 + Math.PI / 14,
				rotationY: 0,
				rotationZ: Math.PI / sl(10, 14),
			};

			let point2D = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));

			autoScale(vertex3D, camera, point2D, {
				startX: -180,
				finishX: 160,
				startY: -160,
				finishY: 160,
				maxScale: 100,
			});

			point2D = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));
			genAssert(distanceFromPointToSegment(point2D[9], point2D[3],point2D[12]) > 10);
			genAssert(distanceFromPointToSegment(point2D[9], point2D[3],point2D[2]) > 10);
			
			genAssert([point2D[1], point2D[2]].mt_rasst()>40);
			
=======
			let a = sl(10, 17);
			let b = sl(5, 14);
			let c = sl(5, 10);
			let d = sl(10, 16);
			let k = slKrome(d, 5, 16);
			let f = a + c;

>>>>>>> 131829577 ([zdn] [fix] - more color)
			let rand = sl1();

			let paint1 = function(ctx) {
<<<<<<< HEAD
				let h = 400;
				let w = 400;
				ctx.translate(w / 2, h / 2);
				ctx.lineWidth = 2;
				ctx.strokeStyle = om.secondaryBrandColors;
				ctx.drawFigureVer2(point2D, matrixConnections);
=======
				ctx.strokeStyle = "#809DF2";
				a *= 13;
				b *= 10;
				c *= 10;
				d *= 10;
				ctx.translate(200, 200);
				ctx.translate(-95, 0);

				ctx.lineWidth = 2;
				for (let i = 0; i < 2; i++) {
					if (i)
						ctx.translate(30, -b * 0.2);
					ctx.moveTo(-c, -b);
					ctx.lineTo(c, -b);
					ctx.lineTo(c, 0);
					ctx.lineTo(a, 0);
					ctx.lineTo(a, d);
					ctx.stroke();
					if (i)
						ctx.setLineDash([4, 3]);
					ctx.lineTo(-c, d);
					ctx.lineTo(-c, -b);
					ctx.stroke();
				}
				ctx.setLineDash([0, 0]);

				ctx.translate(-30, b * 0.2);

				ctx.drawLine(-c, -b, -c + 30, -b - b * 0.2);
				ctx.drawLine(c, -b, c + 30, -b - b * 0.2);
				ctx.drawLine(c, 0, c + 30, -b * 0.2);
				ctx.drawLine(a, 0, a + 30, -b * 0.2);
				ctx.drawLine(a, d, a + 30, d - b * 0.2);

				ctx.setLineDash([4, 3]);
				ctx.drawLine(-c, d, -c + 30, d - b * 0.2);

				//цифорки
				ctx.font = "20px serif";
				ctx.fillText((b / 10).toString(), c + 30 + 3, -b / 2, 18); //b
				ctx.fillText((c / 10).toString(), 30, -b - b * 0.2 - 5, 18); //c
				ctx.fillText((d / 10).toString(), a + 30 + 5, d / 2, 18); //d
				ctx.fillText(k.toString(), a + 10, d * 1.05, 18); //k
				ctx.fillText(f.toString(), 0, d + 30 + 10, 18); //f

>>>>>>> 131829577 ([zdn] [fix] - more color)

				ctx.font = "20px liberation_sans";
				ctx.signSegmentInMiddle(point2D[2].x, point2D[2].y, point2D[7].x, point2D[7].y, par1.height, 10, 20);
				ctx.signSegmentInMiddle(point2D[10].x, point2D[10].y, point2D[15].x, point2D[15].y, par2.height, 10, 20);
				ctx.signSegmentInMiddle(point2D[12].x, point2D[12].y, point2D[15].x, point2D[15].y, par2.width, -10, 20);
				ctx.signSegmentInMiddle(point2D[0].x, point2D[0].y, point2D[1].x, point2D[1].y, par1.width, 18, 20);
				ctx.signSegmentInMiddle(point2D[1].x, point2D[1].y, point2D[2].x, point2D[2].y, par1.depth, 18, 20);
			};
			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: [par1.surfaceArea + par2.surfaceArea - 2 * par2.baseArea, par1.volume + par2.volume][rand],
			});
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27193 25671 25673 25675 25677 25679
