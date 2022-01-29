import * as THREE from 'three'
import { GraphicsApp } from './GraphicsApp'
import { Car } from './Car'
import { Ball } from './Ball';

export class CarSoccer extends GraphicsApp
{
    // Exclamation points tell TypeScript that the variables won't be
    // null even though they aren't initialized in the constructor
    private car! : Car;
    private ball! : Ball;

    private inputVector : THREE.Vector2;

    constructor()
    {
        super();
        this.aspectRatio = 2;
        this.inputVector = new THREE.Vector2();
    }

    createScene() : void
    {
        // Setup camera
        this.camera.position.set(0, 60, 70);
        this.camera.lookAt(0, 0, 10);
        this.camera.up.set(0, 1, 0);

        // Create an ambient light
        var ambientLight = new THREE.AmbientLight('white', .3);
        this.scene.add(ambientLight);

        // Create a directional light
        var directionalLight = new THREE.DirectionalLight('white', .6);
        directionalLight.position.set(0, 2, 1);
        this.scene.add(directionalLight)

        // Load a texture and set it as the background
        this.scene.background = new THREE.TextureLoader().load('assets/crowd.png')

        // Create the green field material
        var fieldMaterial = new THREE.MeshLambertMaterial();
        fieldMaterial.color = new THREE.Color(16/255, 46/255, 9/255);

        // Create a field mesh
        var field = new THREE.Mesh(new THREE.BoxGeometry(100, 1, 120), fieldMaterial);
        field.position.set(0, -.501, 0);
        this.scene.add(field);

        // Load in the pitch image and create a texture
        var pitchMaterial = new THREE.MeshLambertMaterial();
        pitchMaterial.map = new THREE.TextureLoader().load('assets/pitch.png');

        // Create the mesh for the pitch
        var pitch = new THREE.Mesh(new THREE.BoxGeometry(80, 1, 100), pitchMaterial);
        pitch.position.set(0, -0.5, 0);
        this.scene.add(pitch);

        // Create the car
        this.car = new Car(new THREE.Vector3(0, 1, 45), new THREE.Vector3(3, 2, 4), 2.5);
        this.scene.add(this.car);

        // Create the ball
        this.ball = new Ball(new THREE.Vector3(0, 2.6, 0), 2.6);
        this.scene.add(this.ball);
        
    }

    update(deltaTime : number) : void
    {
        // Speed in meters/sec
        const carSpeed = 30;

        // Move the car based on the user input vector
        this.car.velocity.set(carSpeed*deltaTime*this.inputVector.x, 0, carSpeed*deltaTime*-this.inputVector.y);
        this.car.update();

        // Update the ball physics
        this.ball.update();
    }

    onKeyDown(event: KeyboardEvent): void 
    {
        if(event.key == 'w' || event.key == 'ArrowUp')
            this.inputVector.y = 1;
        else if(event.key == 'a' || event.key == 'ArrowLeft')
            this.inputVector.x = -1;
        else if(event.key == 's' || event.key == 'ArrowDown')
            this.inputVector.y = -1;
        else if(event.key == 'd' || event.key == 'ArrowRight')
            this.inputVector.x = 1;
        else if(event.key == ' ')
        {
            this.car.reset();
            this.ball.reset();
        }
    }

    onKeyUp(event: KeyboardEvent): void 
    {
        if((event.key == 'w' || event.key == 'ArrowUp') && this.inputVector.y == 1)
            this.inputVector.y = 0;
        else if((event.key == 's' || event.key == 'ArrowDown') && this.inputVector.y == -1)
            this.inputVector.y = 0;
        else if((event.key == 'a' || event.key == 'ArrowLeft')  && this.inputVector.x == -1)
            this.inputVector.x = 0;
        else if((event.key == 'd' || event.key == 'ArrowRight')  && this.inputVector.x == 1)
            this.inputVector.x = 0;
    }
}
