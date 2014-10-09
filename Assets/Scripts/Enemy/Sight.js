#pragma strict

public var fieldOfViewAngle : float = 90.0;

private var playerInSight : boolean;
private var lastSighting : Vector3;

private var sphereCollider : SphereCollider;
private var player : GameObject;

function Awake() {
    sphereCollider = GetComponent(SphereCollider);
    player = GameObject.FindGameObjectWithTag("Player");
}

function Update() {
    
}

function OnTriggerStay (other : Collider) {
    if (other.gameObject == player) {
        playerInSight = false;

        var playerVector : Vector3 = player.transform.position - transform.position;
        var angle : float = Vector3.Angle(playerVector, transform.forward);

        if (angle < fieldOfViewAngle * 0.5) {
            var hit : RaycastHit;
            if (Physics.Raycast(transform.position, playerVector.normalized, hit, sphereCollider.radius)) {
                if (hit.collider.gameObject == player) {
                    playerInSight = true;
                    lastSighting = player.transform.position;
                }
            }
        }
    }
}

function OnTriggerExit(other : Collider) {
    if (other.gameObject == player) {
        playerInSight = false;
    }
}

function isPlayerInSight() {
    return playerInSight;
}

function getLastSighting() {
    return lastSighting;
}