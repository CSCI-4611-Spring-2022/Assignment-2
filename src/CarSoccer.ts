import * as THREE from 'three'
import { GraphicsApp } from './GraphicsApp'
import { Car } from './Car'
import { Ball } from './Ball';

export class CarSoccer extends GraphicsApp
{
    private inputVector : THREE.Vector2;
    private car : Car;
    private ball : Ball; 

    constructor()
    {
        // Pass in the aspect ratio as a parameter
        super(2);
        
        // Initialize all member variables here
        // This will help prevent runtime errors
        this.inputVector = new THREE.Vector2();
        this.car = new Car(new THREE.Vector3(0, 1, 45), new THREE.Vector3(4, 4, 5), 4);
        this.ball = new Ball(new THREE.Vector3(0, 2.6, 0), 2.6);
    }

    createScene() : void
    {
        // Setup camera
        this.camera.position.set(0, 63, 73);
        this.camera.lookAt(0, 0, 0);
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

        // Add the car and ball to the scene
        this.scene.add(this.car);
        this.scene.add(this.ball);
    }

    update(deltaTime : number) : void
    {
        // Speed in meters/sec
        const carMaxSpeed = 30;

        // Move the car based on the user input vector
        this.car.velocity.set(carMaxSpeed*this.inputVector.x, 0, carMaxSpeed*-this.inputVector.y);
        this.car.update(deltaTime);

        // Update the ball physics
        this.ball.update(deltaTime);

        // Update the ball shadow
        this.ball.updateShadow();
    }

    // Event handler for keyboard input
    // You don't need to modify this function
    onKeyDown(event: KeyboardEvent): void 
    {
        if(event.key == 'w' || event.key == 'ArrowUp')
            this.inputVector.y = 1;
        else if(event.key == 's' || event.key == 'ArrowDown')
            this.inputVector.y = -1;
        else if(event.key == 'a' || event.key == 'ArrowLeft')
            this.inputVector.x = -1;
        else if(event.key == 'd' || event.key == 'ArrowRight')
            this.inputVector.x = 1;
        else if(event.key == ' ')
        {
            this.car.reset();
            this.ball.reset();
        }
    }

    // Event handler for keyboard input
    // You don't need to modify this function
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
