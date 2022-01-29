import * as THREE from 'three'

export class Ball extends THREE.Object3D
{
    readonly radius : number;
    public velocity : THREE.Vector3;
    public initialPosition : THREE.Vector3;

    private shadow : THREE.Mesh;

    constructor(position: THREE.Vector3, radius : number)
    {
        super();
        this.radius = radius;
        this.velocity = new THREE.Vector3();
        this.initialPosition = position;

        // Create the sphere
        var geometry = new THREE.SphereGeometry(this.radius);
        var material = new THREE.MeshLambertMaterial();
        this.add(new THREE.Mesh(geometry, material));

        // Create a semi-transparent shadow
        var shadowGeometry = new THREE.CircleGeometry(this.radius, 20);
        var shadowMaterial = new THREE.MeshBasicMaterial();
        shadowMaterial.color = new THREE.Color(0, 0, 0); 
        shadowMaterial.transparent = true;
        shadowMaterial.opacity = 0.5;
        this.shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
        this.shadow.rotation.set(-90 * Math.PI / 180, 0, 0);
        this.add(this.shadow);
          
        this.reset();
    }

    public reset() : void
    {
        this.position.copy(this.initialPosition);
        this.velocity.set(0, 0, 0);
    }

    public update() : void
    {
        // Move the shadow down and slightly above the ground
        this.shadow.position.set(0, -this.position.y + 0.01, 0);
    }
}