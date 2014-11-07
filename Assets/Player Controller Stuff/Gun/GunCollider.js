#pragma strict

var keyboardShortcut = 0;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	this.gameObject.SetActiveRecursively(false);
	GameObject.Find("astronautglove").SendMessage("SelectWeapon", keyboardShortcut-1);
}