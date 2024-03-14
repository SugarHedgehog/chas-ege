(function() { 'use strict'; retryWhileError(function() {
	/* По двум параллельным железнодорожным путям навстречу друг другу следуют скорый и пассажирский поезда, скорости которых равны соответ-ственно 85 км/ч и 35 км/ч. Длина пассажирского поезда равна 250 метрам. Найдите длину скорого поезда, если время, за которое он прошёл мимо пассажирского, равно 30 секундам. Ответ дайте в метрах. */


	//Переменные
	let v1=sl(3, 100, 0.01);//скорость 1го поезда
	let v2=sl(1, v1-1, 0.01);//скорость 2го поезда
	genAssert(v1!=v2,'скорости равны');
	let l=sl(300, 900, 0.01);//длина 2го поезда
	let t=sl(10, 60, 0.01);//время проезда
	let answ=5*t*(v1-v2)/18-l;

	genAssert(answ>50,'длина поезда слишком маленькая');
	genAssertZ1000(answ,'ответ слишком дробный');
	//Декор
	let trains = sklonlxkand(["поезд","состав"]);
	let train_types=sklonlxkand(["скорый","пассажирский","товарный","почтовый","пожарный","пригородный","грузовой"].iz(2));
	let tr=[[train_types[0],trains.iz()],[train_types[1],trains.iz()]];
	genAssert(tr[0][0].ie+' '+tr[0][1].ie!='скорый состав'&&
			  tr[0][0].ie+' '+tr[0][1].ie!='пригородный состав'&&
			  tr[1][0].ie+' '+tr[1][1].ie!='скорый состав'&&
			  tr[1][0].ie+' '+tr[1][1].ie!='пригородный состав','плохие сочетания');
	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]

	NAtask.setTask({
		text:
			'По двум параллельным железнодорожным путям друг за другом следуют ' + tr[0][0].ie+' '+tr[0][1].ie +' и ' + tr[1][0].ie+' '+tr[1][1].ie +', '+
			'скорости которых равны соответственно ' + v1 + ' $\\dfrac{\\text{км}}{\\text{ч}}$ и ' + v2 + ' $\\dfrac{\\text{км}}{\\text{ч}}$. '+
			'Длина ' + tr[1][0].re+' '+tr[1][1].re +' равна ' + chislitlx(l, 'метр', 'd') + '. ' + the_orderToFind.toZagl() +' длину ' + tr[0][0].re+' '+tr[0][1].re +', '+
			'если время, за которое он прошёл мимо ' + tr[1][0].re+' '+tr[1][1].re +', '+
			'равно ' + chislitlx(t, 'секунда', 'd') + '. '+
			'Ответ дайте в метрах.',
		answers: answ,
		authors: ['Aisse-258'],
	});
	NAtask.modifiers.allDecimalsToStandard();
}, 2000000);})();
/*Решу ЕГЭ: 99612: 118239 117741 117743 117745 117747 117749 117751 117753 117755 117757 117759 117761 117763 117765 117767 117769 117771 117773 117775
			117777 117779 117781 117783 117785 117787 117789 117791 117793 117795 117797 117799 117801 117803 117805 117807 117809 117811 117813 117815
			117817 117819 117821 117823 117825 117827 117829 117831 117833 117835 117837 117839 117841 117843 117845 117847 117849 117851 117853 117855
			117857 117859 117861 117863 117865 117867 117869 117871 117873 117875 117877 117879 117881 117883 117885 117887 117889 117891 117893 117895
			117897 117899 117901 117903 117905 117907 117909 117911 117913 117915 117917 117919 117921 117923 117925 117927 117929 117931 117933 117935
			117937 117939 117941 117943 117945 117947 117949 117951 117953 117955 117957 117959 117961 117963 117965 117967 117969 117971 117973 117975
			117977 117979 117981 117983 117985 117987 117989 117991 117993 117995 117997 117999 118001 118003 118005 118007 118009 118011 118013 118015
			118017 118019 118021 118023 118025 118027 118029 118031 118033 118035 118037 118039 118041 118043 118045 118047 118049 118051 118053 118055
			118057 118059 118061 118063 118065 118067 118069 118071 118073 118075 118077 118079 118081 118083 118085 118087 118089 118091 118093 118095
			118097 118099 118101 118103 118105 118107 118109 118111 118113 118115 118117 118119 118121 118123 118125 118127 118129 118131 118133 118135
			118137 118139 118141 118143 118145 118147 118149 118151 118153 118155 118157 118159 118161 118163 118165 118167 118169 118171 118173 118175
			118177 118179 118181 118183 118185 118187 118189 118191 118193 118195 118197 118199 118201 118203 118205 118207 118209 118211 118213 118215
			118217 118219 118221 118223 118225 118227 118229 118231 118233 118235 118237*/
