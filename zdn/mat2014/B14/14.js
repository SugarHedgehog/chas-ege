(function() {
NAinfo.requireApiVersion(0, 2);
var tank = ['���������','�������','�������','��������'].iz();
var tank_cont;
var mechanic;
var vol_dif;
var time_dif;
var num1;
var num2;
var ono;
var doin = ['���������','����������'].iz();
if (tank == '�������') 
	tank_cont = ['�������','������������'].iz();//����� ��� "������� ��������"
else 
	tank_cont = ['�������','��������','������������'].iz();
vol_dif = sluchch(2,10);
time_dif = sluchch(2,15);
var i = [1,2].iz();//��� ��������� ������ ��������� � ����� �������������
if (i == 1)
{
	mechanic = ['�����'].iz();
	num1 = '������';
	num2 = '������';
	ono = '���';
}
else if (i == 2)
{
	if (doin != '����������') 
		mechanic = ['�����','�����'].iz();//����� �������� �� ���������� - ������� ���
	else 
		mechanic = ['�����'].iz();
	num1 = '������';
	num2 = '������';
	ono = '��';
}
var vol_of_tank = vol_dif*time_dif*(Math.pow(sluchch(2,10),2)-1)/4;
//����� ������������ ��� ������� ������ ��� ��������� ������ �����
var water = ['����','��������'].iz();
var litr = sklonlxkand(['����','��������'].iz());
NAtask.setTask({
text:   num1.toZagl()+' '+mechanic+' ���������� �� '+chislitlx(vol_dif,litr)+' '+water+' � ������ ������, ��� '+num2+'.'+
	' ������� '+litr.rm+' '+water+' � ������ ���������� '+num2+' '+mechanic+', ���� '+tank+' '+tank_cont+
	' '+chislitlx(vol_of_tank,litr)+' '+ono+' '+doin+' �� '+chislitlx(time_dif,'������')+' �������, ��� '+num1+' '+mechanic+'?\n',
answers: ((Math.sqrt(Math.pow(vol_dif*time_dif,2)+4*vol_dif*time_dif*vol_of_tank))/(2*time_dif)+vol_dif/2),
});
})();
//����� 26599
//Aisse-258
