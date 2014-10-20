#pragma strict

private var enemyGameObject : GameObject;

function Awake() {
	enemyGameObject = transform.gameObject;
}

function Update() {

}

function OnTriggerEnter(other : Collider) {
    if (other.gameObject.tag == "Player") {
    	Destroy(enemyGameObject);
    }
}
