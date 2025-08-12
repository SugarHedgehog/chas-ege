(function() {
let key = "6";
let preference = ['first_speed', 'second_speed'];
let rand = getListedPreference(key, preference.map((pref, index) => ({
	preference: pref,
	preferenceValue: index
})), sl(preference.length - 1));

for(var x=0.5;!(x.isZ()&&x>0);){
	var a=sluchch(2,10);
	var t=sluchch(4,10);
	var b=sluchch(2,t-1);
	var x=a*t/b-a;
}

var t1=sluchch(om.transportm.ie.length-1);
var t3=om.transportm.r2[t1];
var t4=om.transportm.re[t1];

var t5=['первым','вторым'];
var p5=[x+a,x];

window.vopr.txt='Два '+t3+' одновременно отправились в '+(x*t)+'-километровый пробег. Первый ехал со скоростью, на '+
				a+' км/ч большей, чем скорость второго, и прибыл к финишу на '+chislitlx(b,'час')+
				' раньше второго. Найти скорость '+
				t4+', пришедшего к финишу '+t5[rand]+'. Ответ дайте в км/ч.';


window.vopr.ver=[p5[rand]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 26583б 26584
//Николай Авдеев
