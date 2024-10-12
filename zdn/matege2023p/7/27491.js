(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 0.1,
			},
			questionsF: {
				main: 'point',
				conditions: ['value_on_the_segment'],
				variants: ['smallest_value', 'largest_value'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 0,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 2, max:10}, 
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
		});
	}, 1000);
})();
/*27492 27491 6413 6415 27493 508383 509395 513421 513440 548259 561723 561764 
628360 628478 7551 7553 7555 7563 7565 7567 7569 7571 7573 7575 7577 7579 7583 
7585 7589 7597 7599 7609 7611 7619 7627 7631 7641 7643 7645 7649 7657 7659 7663 
7665 7669 7673 7679 7687 7689 7691 7695 7697 7699 7711 7715 7717 7719 7725 7727 
7731 7733 7737 7739 7743 7745 7747 7751 7757 7759 7767 7773 7779 7781 7783 7785 
7791 7793 7797 7799  6403 6405 7787 7789 7795 504233 505442 6411 6425 7557 7559 
7561 7581 7587 7591 7593 7595 7601 7603 7605 7607 7613 7615 7617 7621 7623 7625 
7629 7633 7635 7637 7639 7647 7651 7653 7655 7661 7667 7671 7675 7677 7681 7683 
7685 7693 7701 7703 7705 7707 7709 7713 7721 7723 7729 7735 7741 7749 7753 7755 
7761 7763 7765 7769 7771 7775 7777*/
