(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let A = sl(10,600);//кол-во деталей (базовое)
		let b = sl(1,A/4-1,0.01);//кол-во деталей (разница)
		genAssert(b<30,'Разница в час слишком большая: '+b);
		let x = sl(1,100,0.01);//кол-во деталей (ответ)
		genAssert(b<x,'Разница больше изготовления: '+x);
		let n = (A*b)/(x*(x+b));//время изготовления (разница)
		genAssertZ1000(n,'Время слишком дробное: '+n);
		genAssert(n<24,'Время > 24 ч: '+n);
		let detail = sklonlxkand(['деталь','заготовка','продукт','предмет','горшок','беляш','пирожок','бутерброд','кувшин','молоток','инструмент','игрушка'].iz());
		let rab = sklonlxkand(['рабочий','сотрудник','работник','мастер'].iz());
		let v=sl1();
		let rab_num=['первый','второй'];

		NAtask.setTask({
			text: ['Заказ на','Задание на изготовление'].iz()+' '+chislitlx(A, detail.ie,'r')+' первый '+rab.ie+' выполняет на '+chislitlx(n, 'час')+' быстрее, чем второй. '+
				['Сколько '+detail.rm+' в час делает '+rab_num[v]+' '+rab.ie+', если известно, что '+rab_num[1-v]+' за час делает на '+chislitlx(b, detail.ie,'r')+' больше?',
				'Сколько '+detail.rm+' в час делает '+rab_num[v]+' '+rab.ie+', если известно, что он за час делает на '+chislitlx(b, detail.ie,'r')+' меньше, чем '+rab_num[1-v]+'?'].iz(),
			answers: v==1 ? x : x+b,
			authors: ['Aisse-258']
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000000);
})();

/*РешуЕГЭ: 26592: 5791 39633 509604 642328 5793
	5795 5797 5799 5801 5803 39571 39573 39575
	39577 39579 39581 39583 39585 39587 39589
	39591 39593 39595 39597 39599 39601 39603
	39605 39607 39609 39611 39613 39615 39617
	39619 39621 39623 39625 39627 39629 39631
	642479 642549 642619 642689*/
