(function() {
	retryWhileError(function() {

		let v = sl1();

		let prism6 = new RegularPrism({
			height: sl(10, 30),
			baseSide: sl(5, 10) * 6,
			numberSide: 6
		});

		let prism3 = new Prism({
			height: prism6.height,
			baseArea: prism6.baseArea.ceil() / 6,
		});

		let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'F₁', 'A₁', 'B₁', 'C₁', 'D₁', 'E₁', ];
		let strok = [5, 4];

		let matrixPrism = [
			[1],
			[0, 1],
			[0, 0, strok],
			[0, 0, 0, strok],
			[1, 0, 0, 0, strok],
			[0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 0, 0, 1],
			[0, 0, 1, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, strok, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, strok, 0, 1, 0, 0, 0, 1],
		];

		let vert = ['A', 'B', 'C', 'D', 'E', 'F'];
		vert = vert.permuteCyclic(sl(0, 5));
		vert = vert.slice(0, 3);
		vert = vert.concat(vert.map((elem) => elem + '_1'));

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: Math.PI / 4,
		};

		let point2DPar = prism6.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(prism6, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPar = prism6.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPar, matrixPrism);
			ctx.font = "25px liberation_sans";

			point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)));
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: ['Найдите ', 'Дана треугольная призма $' + vert.join('') + '$, площадь основания которой равна $' +
				prism3.baseArea + '$, а высота, проведённая к этому основанию, равна $' + prism3.height + '$. Найдите '
			][v],
			questions: [{
				text: 'объём',
				answers: [prism3.volume, 6 * prism3.volume][v],
			}, ],
			postquestion: [' многогранника, ' +
				'вершинами которого являются вершины $' + vert.shuffleJoin(', ') +
				'$ правильной шестиугольной призмы ' +
				'$ABCDFEA_1B_1C_1D_1F_1E_1$, площадь основания которой равна $' + 6 * prism3.baseArea +
				'$, а боковое ребро равно $' +
				prism3.height +
				'$', ' прямой призмы с вершинами $' + ['A', 'B', 'C', 'D', 'E', 'F', 'A_1', 'B_1', 'C_1', 'D_1', 'E_1', 'F_1']
				.shuffleJoin(', ') + '$'
			][v] + '.',
			analys: '',
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.variativeABC(letter);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
/*
Решу ЕГЭ
245344 245347 267683 268183 268521 268527 651050 267685 267687 267689 267691 267693 267695 267697 267699 267701 267703 267705 267707 267709 267711 267713 267715 267717 267719 267721 267723 267725 267727 267729 267731 267733 267735 267737 267739 267741 267743 267745 267747 267749 267751 267753 267755 267757 267759 267761 267763 267765 267767 267769 267771 267773 267775 267777 267779 267781 267783 267785 267787 267789 267791 267793 267795 267797 267799 267801 267803 267805 267807 267809 267811 267813 267815 267817 267819 267821 267823 267825 267827 267829 267831 267833 267835 267837 267839 267841 267843 267845 267847 267849 267851 267853 267855 267857 267859 267861 267863 267865 267867 267869 267871 267873 267875 267877 267879 267881 267883 267885 267887 267889 267891 267893 267895 267897 267899 267901 267903 267905 267907 267909 267911 267913 267915 267917 267919 267921 267923 267925 267927 267929 267931 267933 267935 267937 267939 267941 267943 267945 267947 267949 267951 267953 267955 267957 267959 267961 267963 267965 267967 267969 267971 267973 267975 267977 267979 267981 267983 267985 267987 267989 267991 267993 267995 267997 267999 268001 268003 268005 268007 268009 268011 268013 268015 268017 268019 268021 268023 268025 268027 268029 268031 268033 268035 268037 268039 268041 268043 268045 268047 268049 268051 268053 268055 268057 268059 268061 268063 268065 268067 268069 268071 268073 268075 268077 268079 268081 268083 268085 268087 268089 268091 268093 268095 268097 268099 268101 268103 268105 268107 268109 268111 268113 268115 268117 268119 268121 268123 268125 268127 268129 268131 268133 268135 268137 268139 268141 268143 268145 268147 268149 268151 268153 268155 268157 268159 268161 268163 268165 268167 268169 268171 268173 268175 268177 268179 268181 268185 268187 268189 268191 268193 268195 268197 268199 268201 268203 268205 268207 268209 268211 268213 268215 268217 268219 268221 268223 268225 268227 268229 268231 268233 268235 268237 268239 268241 268243 268245 268247 268249 268251 268253 268255 268257 268259 268261 268263 268265 268267 268269 268271 268273 268275 268277 268279 268281 268283 268285 268287 268289 268291 268293 268295 268297 268299 268301 268303 268305 268307 268309 268311 268313 268315 268317 268319 268321 268323 268325 268327 268329 268331 268333 268335 268337 268339 268341 268343 268345 268347 268349 268351 268353 268355 268357 268359 268361 268363 268365 268367 268369 268371 268373 268375 268377 268379 268381 268383 268385 268387 268389 268391 268393 268395 268397 268399 268401 268403 268405 268407 268409 268411 268413 268415 268417 268419 268421 268423 268425 268427 268429 268431 268433 268435 268437 268439 268441 268443 268445 268447 268449 268451 268453 268455 268457 268459 268461 268463 268465 268467 268469 268471 268473 268475 268477 268479 268481 268483 268485 268487 268489 268491 268493 268495 268497 268499 268501 268503 268505 268507 268509 268511 268513 268515 268517 268519 268523 268525 268529 268531 268533 268535 268537 268539 268541 268543 268545 268547 268549 268551 268553 268555 268557 268559 268561 268563 268565 268567 268569 268571 268573 268575 268577 268579 268581 268583 268585 268587 268589 268591 268593 268595 268597 268599 268601 268603 268605 268607 268609 268611 268613 268615 268617 268619 268621 268623 268625 268627 268629 268631 268633 268635 268637 268639 268641 268643 268645 268647 268649 268651 268653 268655 268657 268659 268661 268663 268665 268667 268669 268671 268673 268675 268677 268679 268681 268683 268685 268687 268689 268691 268693 268695 268697 268699 268701 268703 268705 268707 268709 268711 268713 268715 268717 268719 268721 268723 268725 268727 268729 268731 268733 268735 268737 268739 268741 268743 268745 268747 268749 268751 268753 268755 268757 268759 268761 268763 268765 268767 268769 268771 268773 268775 268777 268779 268781 268783 268785 268787 268789 268791 268793 268795 268797 268799 268801 268803 268805 268807 268809 268811 268813 268815 268817 268819 268821 268823 268825 268827 268829 268831 268833 268835 268837 268839 268841 268843 268845 268847 268849 268851 268853 268855 268857 268859 268861 268863 268865 268867 268869 268871 268873 268875 268877 268879 268881 268883 268885 268887 268889 268891 268893 268895 268897 268899 268901 268903 268905 268907 268909 268911 268913 268915 268917 268919 268921 268923 268925 268927 268929 268931 268933 268935 268937 268939 268941 268943 268945 268947 268949 268951 268953 268955 268957 268959 268961 268963 268965 268967 268969 268971 268973 268975 268977 268979 268981 268983 268985 268987 268989 268991 268993 268995 268997 268999 269001 269003 269005 269007 269009 269011 269013 269015 269017 269019 269021 269023 269025 269027 269029 269031 269033 269035 269037 269039 269041 269043 269045 269047 269049 269051 269053 269055 269057 269059 269061 269063 269065 269067 269069 269071 269073 269075 269077 269079 269081 269083 269085 269087 269089 269091 269093 269095 269097 269099 269101 269103 269105 269107 269109 269111 269113 269115 269117 269119 269121 269123 269125 269127 269129 269131 269133 269135 269137 269139 269141 269143 269145 269147 269149 269151 269153 269155 269157 269159 269161 269163 269165 269167 269169 269171 269173 269175 269177 269179 269181 269183 269185 269187 269189 269191 269193 269195 269197 269199 269201 269203 269205 269207 269209 269211 269213 269215 269217 269219 269221 269223 269225 269227 269229 269231 269233 269235 269237 269239 269241 269243 269245 269247 269249 269251 269253 269255 269257 269259 269261 269263 
*/
