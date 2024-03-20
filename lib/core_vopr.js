'use strict';

window.vopr={};

window.vopr.vrn_ist=function(kand){
	for(var i2=0;i2<this.ver.length;i2++){
		this.ver[i2]=this.ver[i2].istDataToStd();
		if(this.ver[i2]==kand.istDataToStd())
			return 1;
	}
	return 0;
};

window.vopr.vrn_mat=function(kand){
	for(var i2=0;i2<this.ver.length;i2++)
		if(this.ver[i2].ts()==kand.ts())
			return 1;
	return 0;
};

window.vopr.vrn_list=function(kand){
	return ''+kand.split(/;\s*/g).sortDelDubl() == ''+chaslib.toStringsArray(this.ver).sortDelDubl();
};

window.vopr.podg=function(){
	window.vopr.dey=function(){};
	window.vopr.ver=[];
	window.vopr.nev=[];
	window.vopr.txt='';
	window.vopr.rsh='';
	window.vopr.kat=[];
	window.vopr.authors=[];
	window.vopr.dgn=1;
	window.vopr.err=0;
	window.vopr.vrn=window.vopr.vrn_mat;
}
window.vopr.podg();

window.vopr.trd=function(){'use strict';
	try{
		window.vopr.dey();
	}catch(e){}
}

function AtoB(n){
//n - количество неверных ответов
	n=n?n:3;
	if(window.vopr.nev.hasDubl()){
		window.vopr.nev=window.vopr.nev.sortDelDubl();
		console.log('AtoB(): nev: повторяющиеся варианты;');
	}
	if(window.vopr.ver.hasDubl()){
		window.vopr.ver=window.vopr.ver.sortDelDubl();
		console.log('AtoB(): ver: повторяющиеся варианты;');
	}
	if(vopr.dgn && dvig.dgn && dvig.validateVopr()){
		vopr.err=1;
		return;
	}
	var nev=window.vopr.nev.iz(n);
	var ver=window.vopr.ver.iz();
	var a=[[ver].concat(nev),[].N(n+1)].T().shuffle().T();
	window.vopr.ver=[a[1].indexOf(1)+1];
	window.vopr.nev=[];
	for(var i=0;i<=n;i++){
		window.vopr.txt+='<br/>'+(i+1)+') '+a[0][i];
	}
}

function AtoB2(n, m) {
	if (window.vopr.nev.hasDubl()) {
		window.vopr.nev = window.vopr.nev.sortDelDubl();
		console.log('AtoB(): nev: повторяющиеся варианты;');
	}
	if (window.vopr.ver.hasDubl()) {
		window.vopr.ver = window.vopr.ver.sortDelDubl();
		console.log('AtoB(): ver: повторяющиеся варианты;');
	}
	if (vopr.dgn && dvig.dgn && dvig.validateVopr()) {
		vopr.err = 1;
		return;
	}
	let wrong = (n) ? window.vopr.nev.iz(n) : [];
	let right = (m) ? window.vopr.ver.iz(m) : [];
	let test = wrong.concat(right).shuffle().iz(n+m);
	let answ = [];
	for (let i = 0; i < right.length; i++)
		answ.push(test.indexOf(right[i]) + 1)

	answ = answ.sortNumeric().join('');
	genAssert(!answ.includes('0'), 'Невозможно сформулировать ответ');
	window.vopr.ver = [answ];
	window.vopr.nev = [];
	for (let i = 0; i <= test.length-1; i++) {
		window.vopr.txt += '<br/>' + (i + 1) + ') ' + test[i];
	}
}

console.log('core_vopr.js отработал');
