#pragma strict

public var fieldOfViewAngle : float = 360.0;
public var sightRadius : float = 12.0;

private var playerInSight : boolean;
private var lastSighting : Vector3;

private var player : GameObject;

function Awake() {
    player = GameObject.FindGameObjectWithTag("Player");
}

function Update() {
    var playerVector : Vector3 = player.transform.position - transform.position;

    if (Mathf.Abs(playerVector.magnitude) <= sightRadius) {
        playerInSight = false;

        var angle : float = Vector3.Angle(playerVector, transform.forward);

        if (angle < fieldOfViewAngle * 0.5) {
            var hit : RaycastHit;
            if (Physics.Raycast(transform.position, playerVector.normalized, hit, sightRadius)) {
                if (hit.collider.gameObject == player) {
                    playerInSight = true;
                    lastSighting = player.transform.position;
                }
            }
        }
    } else {
        playerInSight = false;
    }
}

function isPlayerInSight() {
    return playerInSight;
}

function getLastSighting() {
    return lastSighting;
}