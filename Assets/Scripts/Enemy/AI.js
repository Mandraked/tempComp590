#pragma strict

public var followSpeed : float = 2.0;
public var resetSpeed : float = 2.5;
public var followStoppingDistance : float = 6.0;
public var resetStoppingDistance : float = 1.0;

private var sight : Sight;
private var nav : NavMeshAgent;
private var particles : ParticleSystem;
private var player : GameObject;

private var resetPosition : Vector3;
private var resetRotation : Quaternion;

function Awake () {
    sight = GetComponent(Sight);
    nav = GetComponent(NavMeshAgent);
    particles = transform.Find("EnemyVisual").GetComponent(ParticleSystem);
    player = GameObject.FindGameObjectWithTag("Player");

    resetPosition = transform.position;
    resetRotation = transform.rotation;
}

function Update () {
    particles.transform.Rotate(0, 60 * Time.deltaTime, 0);

    if (sight.isPlayerInSight()) {
        particles.startColor = Color.red;
        Follow();
    } else {
        particles.startColor = Color.cyan;
        Abandon();
    }
}

function Follow() {
    nav.destination = player.transform.position;
    nav.speed = followSpeed;
    nav.stoppingDistance = followStoppingDistance;

    transform.LookAt(player.transform.position);
}

function Abandon() {
    nav.destination = resetPosition;
    nav.speed = resetSpeed;
    nav.stoppingDistance = resetStoppingDistance;

    var delta : Vector3 = transform.position - resetPosition;
    if (Mathf.Abs(delta.magnitude) <= resetStoppingDistance) {
        transform.position = resetPosition;
        transform.rotation = resetRotation;
    }
}
