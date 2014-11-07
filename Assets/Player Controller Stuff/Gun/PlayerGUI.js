#pragma strict

var maxHealth = 100;
var curHealth : float = 100;
var maxOxygen = 100;
var curOxygen : float = 100;
var healthBarLength : float;
var oxygenBarLength : float;
var oxygenRate : float = 0.01;
private var startTime : float;

function Start () {
	startTime = Time.time;
	healthBarLength = Screen.width/2;
	oxygenBarLength = Screen.width/2;
}

function Update () {
	adjustCurrentHealth(0);
	if(GameObject.FindWithTag("PlanetSurface")){
		adjustCurrentOxygen(-oxygenRate);
	} else {
		if(curOxygen<maxOxygen){
			adjustCurrentOxygen(oxygenRate);
		}
	}
}

function OnGUI() {
	GUI.Box(new Rect(10, 10, healthBarLength, 20),"");
	GUI.Box(new Rect(10, 10, Screen.width/2, 20), "Health: "+parseInt(curHealth) + "/" + maxHealth);
	GUI.Box(new Rect(10, 40, oxygenBarLength, 20),"");
	GUI.Box(new Rect(10, 40, Screen.width/2, 20), "Oxygen: "+parseInt(curOxygen) + "/" + maxOxygen);
}

function adjustCurrentHealth(NumVal : float) : float {
	curHealth += NumVal;
	if(curHealth<1){
		curHealth = 0;
	}
	if(curHealth>maxHealth){
		curHealth = maxHealth;
	}
	if(maxHealth<1){
		maxHealth = 1;
	}
	var a : float = maxHealth;
	var b : float = curHealth/a;
	healthBarLength = (Screen.width/2) * b;
}

function adjustCurrentOxygen(NumVal : float) : float {
	curOxygen += NumVal;
	if(curOxygen<1){
		curOxygen = 0;
		adjustCurrentHealth(NumVal);
	}
	if(curOxygen>maxOxygen){
		curOxygen = maxOxygen;
	}
	if(maxOxygen<1){
		maxOxygen = 1;
	}
	var a : float = maxOxygen;
	var b : float = curOxygen/a;
	oxygenBarLength = (Screen.width/2) * b;
}