import * as THREE from 'three'

export class Car extends THREE.Object3D
{
    public velocity : THREE.Vector3;
    public collisionRadius : number;
    public initialPosition : THREE.Vector3;

    constructor(position: THREE.Vector3, size : THREE.Vector3, collisionRadius : number)
    {
        super();
        this.collisionRadius = collisionRadius;
        this.initialPosition = position;
        this.velocity = new THREE.Vector3();

        var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
        var material = new THREE.MeshLambertMaterial();
        material.color = new THREE.Color(0.8, 0.2, 0.2);
        this.add(new THREE.Mesh(geometry, material));
        
        this.reset();
    }

    public reset() : void
    {
        this.position.copy(this.initialPosition);
        this.velocity.set(0, 0, 0);
    }

    public update() : void
    {
        this.translateX(this.velocity.x);
        this.translateZ(this.velocity.z);
    }
}