#pragma strict

var Gun : GameObject;
var upDown:float; 
var speed:int = 2; 
var hightDiv:int = 150; 
var t:float;

function Start () {
	// Create a new bullet pointing in the same direction as the gun 
	Gun = Instantiate(Gun, transform.position, transform.rotation);
}

function Update () {
	if(Gun.activeSelf){
		Gun.transform.Translate(Vector3.up * upDown); t += speed *(Time.deltaTime); upDown = (Mathf.Sin(t))/hightDiv;
	}
}