# Assignment 2: Car Soccer

**Due: Monday, February 14, 11:59pm CDT**

This purpose of this assignment is to create a simple, fun 3D soccer game loosely inspired by the 2015 game [*Rocket League*](http://rocketleague.psyonix.com/). This program covers a number of important computer graphics concepts.  You will learn to:

- Use TypeScript and Three.js to build a 3D graphics program
- Draw simple 3D geometries
- Work effectively with 3D points, vectors, and other "graphics math"
- Balance the tradeoffs between realism and effective game play by simulating physics in a "plausible" but not necessarily 100% realistic way
- Successfully program your first interactive 3D graphics game!

## Submission Information

You should fill out this information before submitting your assignment. Make sure to document the name and source of any third party assets that you added, such as models, images, sounds, or any other content used that was not solely written by you. 

Name:

Third Party Assets:

Wizard Bonus Functionality:

## Prerequisites

To work with this code, you will first need to install [Node.js](https://nodejs.org/en/) and [Visual Studio Code](https://code.visualstudio.com/). 

## Getting Started

The starter code implements the general structure that we reviewed in lecture.  After cloning your repository, you will need to set up the initial project by pulling the dependencies from the node package manager with:

```
npm install
```

This will create a `node_modules` folder in your directory and download all the dependencies needed to run the project.  Note that this folder is `.gitignore` file and should not be committed to your repository.  After that, you can compile and run a server with:

```
npm run start
```

Webpack should launch your program in a web browser automatically.  If not, you can run it by pointing your browser at `http://localhost:8080`.

## Game Description

Here is a screenshot from an example of the game you will create.

![Screenshot](./images/screenshot.jpg)

The playing field, or pitch, is rendered out of 3D boxes and line segments with some image textures mapped onto them. The car is drawn using simple 3D primitives; in our solution, it's just a box. The soccer ball is a sphere. The car can be moved around using the WASD or arrow keys. When the car hits the ball, the ball reacts in a "physically plausible" way, updating its current velocity based on the direction it was hit and the velocity of the car at the time of impact. 

Most computer games modeled after real sports are designed to balance the tradeoff between physical realism and game play. A completely realistic simulation of, say, soccer would be quite complex and would make it really difficult to play the game on a 2D computer screen, especially with the limited amount of control possible using a keyboard/mouse or controller input. In our case, the playing field is the size of a real soccer pitch, and the car is about the size of an actual car, but the ball is absurdly large to make it easy to hit. 

## Programming Requirements

You can try a [finished version of the game](https://csci-4611-spring-2022.github.io/Builds/Assignment-2/) in the Builds repository on the course GitHub. This is only a representative example, and you do not need to make your game look or play exactly the same. Your program can have a different look and feel, so long as it satisfies the requirements specified in the rubric.

The starter code will render the pitch, the soccer ball, and the car, and it includes an unrealistic method for moving the car around the pitch. Your assignment is to do the following:

1. Complete the 3D graphics for drawing the pitch, goals, and the bounding box of the playing area.
2. Add car-like steering and rotation instead of simply translating the car across the pitch.
3. Have the computer put the ball into play, kicking off the ball from the center of the pitch whenever you press the space bar.
4. Implement gravity for the ball.
5. Make the ball bounce off the ground and the imaginary "walls" and "ceiling" that bound the pitch.
6. Program support for hitting the ball with the car whenever they come into contact.
7. Detect when the ball hits the goals on either side of the pitch.

#### Drawing the Soccer Field

The coordinate system and dimensions of the pitch (in meters) are shown below. The support code is already set up to work in units of meters, matching the diagram above. The ball itself has a radius of 2.6 meters. You'll notice this picture also includes thin grid lines that mark the goals and the bounding box for the playing area. These are the lines you should draw to complete the 3D graphics model of the pitch.

![Field Dimensions](./images/dimensions.png)

#### Simulating the Physics

To make the game easier to implement, we will make a few simplifying assumptions about the physics. Specifically, you should follow these guidelines in your code.

**Friction:** To simulate friction, you can simply decrease the speed of the ball a bit when it hits anything. For example, you might make the speed after bouncing 0.8 times the speed before the bounce.

**Gravity:** The ball should accelerate downward due to gravity, but this should be a plausible approximation of gravity. This is, after all, a game where a huge soccer ball is being hit by a speeding car. You may find that you need a larger-than-life gravitational acceleration so that the ball does not stay in the air for an annoyingly long time.

**Car Driving and Steering:** We will assume we are playing this game on a desktop with a keyboard (using WASD or the arrow keys to drive the car). The input is just based on 4 buttons (up, down, left, right). When Up is pressed, your car should accelerate to some maximum speed. When Up is released, the car should slow down and then stop. The same thing should happen for Down, but in this case the car should drive backwards. When Left is held down, the car should turn left, but only if it is moving forward at the same time because you cannot turn a car unless it is moving forward. The opposite should happen when Right is held down. You do not need to model a gas pedal or brakes or a steering wheel that make it possible to provide more subtle control of the car. Just think of it as applying full gas or turning the steering wheel as far as you can to one side or the other whenever these keys are held down.

**Car-Ball Collisions:** First, for the purposes of collisions, treat both the ball **and the car** as spheres. This simplifies collision tests, as we describe below in the Technical Background section, and it is not as unusual of a simplification as you might think. In games, it is typical to test for collisions using a "proxy geometry" that is much simpler than the 3D model that is actually drawn on the screen. With this approach, you can calculate fast, approximate physics while also having good looking graphics. Second, in real life, when two objects collide, they experience equal and opposite forces, and both their velocities change. To keep things simple, in this assignment we will assume that in a collision between the ball and the car, only the ball's velocity changes and the car is unaffected.

## Rubric

Graded out of 20 points.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**3D Drawing**

1. Draw lines around the boundary of the 3D soccer pitch so that we can see the box that we will be playing inside.  You can use `Line` class in Three.js for this. Note that in newer versions of OpenGL, the line thickness is always drawn as 1 pixel wide. (2)

2. Draw a grid of lines for each goal.  In the example program, the `BoxGeometry` class was used to create `Mesh` objects that appear as thicker lines.  However, you may alternatively use the `Line` or `LineLoop` classes instead. (2)

   **Ball Physics**

3. ~~Make the ball move through the air based on a random initial velocity, and relaunch the ball when the space bar is pressed. (1)~~

4. Update the ball's position and velocity each time step based on the acceleration due to gravity. (2)

5. Detect contacts between the ball and the ground, and make the ball bounce in the correct direction. That is, the ball's velocity vector should be reflected about the normal of the ground. (1)

6. Detect when the ball hits the walls and the ceiling and make it bounce off them too. (1)

7. Decrease the speed of the ball when it bounces. This is due to friction and other factors, but you do not need to simulate these; just decrease the speed by some constant. We used 80% in our implementation. (1)

8. When the ball hits one of the goals, reset the car to the initial position and relaunch the ball from the center of the pitch. You don't have to animate the ball actually going *into* the goal, just detect when the ball enters these special rectangular regions. (2)

   **Car Driving**

9. Give the car a more realistic driving model. The car should always move forwards or backwards relative to the direction it's facing, but never sideways. The up and down arrow keys should change its speed, while left and right should turn it at a rate proportional to its speed. One approach for doing this is described below at the end of the technical discussion. (2)

10. Prevent the car from leaving the bounds of the playing area. (2)

    **Car-Ball Collisions**

11. Detect contact between the ball and the car using the sphere-sphere collision approach described in more detail below. (2)

12. Compute the new velocity of the ball after the collision with the car according to the formula described in more detail below. ~~(2)~~ (3)

#### Prohibited Functions

**Collision Detection:** Three.js may have built-in functions for detecting intersections between different shapes.  You are **not** permitted to use them to complete Parts 11 and 12.  You should implement the specific algorithms presented in class and described below.

**setInterval:** The `setInterval()` function is useful for triggering occasional events based on a timer.  It should **not** be used for animations in computer graphics.  You should put all the logic for continuously moving objects in the `update()` method.

## Wizard Bonus Challenge

All of the assignments in the course will include great opportunities for students to go beyond the requirements of the assignment and do cool extra work. On each assignment, you can earn **one bonus point** for implementing a meaningful new feature to your program. This should involve some original new programming, and should not just be something that can be quickly implemented by copying and slightly modifying existing code.  

There are some great opportunities for extra work in this assignment. Turn this program into a more exciting game! Add some wheels and brake lights to your car. Change the camera position to follow the car and/or point to the ball! Add a car for a second player! Draw some fireworks when a goal is scored before resetting the ball! Keep count of the score by drawing some tokens above or next to the goals!  Or, even better, think of your own cool, creative idea!

A single point may not sound like a lot, but keep in mind that on a 20-point scale, this is equivalent to a 5% bonus! Make sure to document your wizard functionality in the Submission Information portion of this readme file, so that the TAs know what to look for when they grade your program.

The wizard bonus challenge also offers you a chance to show off your skills and creativity!  While grading the assignments the TAs will identify the best four or five examples of people doing cool stuff with computer graphics. We call these students our **wizards**, and after each assignment, the students selected as wizards will have their programs demonstrated to the class.

## Useful Technical Info

#### Simulating Collisions

One of the main challenges in this assignment is handling collisions between the ball and the car. For collision purposes, we will approximate the car by a sphere, as shown in the figure below, so we only need to detect whether the two spheres representing the car and the ball are intersecting. Of course, this may result in us detecting collisions when the car's rendered geometry does not actually hit the ball, or vice versa, but as long as the size of proxy and the car model are not too different it shouldn't matter too much to the gameplay.

![](./images/collision1.png)

In any collision handling routine, there are two main steps: first, detecting whether a collision has occurred, and second, resolving the collision by updating the positions and velocities of the colliding objects. With spheres, collision detection is easy: two spheres have collided if the distance between their centers is less than or equal to the sum of their radii. Notice that the figure illustrates the case where the two spheres overlap each other. In other words, one has passed inside the other. In real life, if you have two solid spheres, this case would never occur. The spheres would bounce off each other before penetrating each other. However, this happens quite regularly in computer graphics simulation. If you update your simulation once each frame, that means the elapsed time (i.e., Delta T or *dt)* between consecutive frames will be somewhere around 1/30–1/60 second. That's fast, but still not fast enough to capture the *exact* moment when the ball first makes contact with the car. This means that if you update the position of the ball using p*'* = p + v *dt*, you may have a situation where p' ends up being inside the car's proxy sphere or inside a wall of the playing field. When you detect this has occurred, you should calculate a corrected position for the ball that places it just outside of the obstacle, as shown in the diagram below:

![](./images/collision2.jpg)

When a ball bounces off the ground or a wall or even a sphere its velocity changes, but how? It depends on the normal of the surface at the point the ball comes into contact. Here is an illustration for a ball bouncing off an inclined plane.

![](./images/collision3.png)

The ball approaches with a velocity vector v. When the ball bounces, its velocity is reflected about the normal of the plane n, and its new, reflected velocity is r.  The equation for r is shown above. This is actually a general formula for reflecting any vector about another vector. This gets used in computer graphics lighting equations as well. Notice that it involves a dot product!

So, if this is how a ball bounces off an inclined plane, what about a sphere? Actually, we can use the exact same equation. We just need the normal at the exact point where the spheres touch. For a collision between two spheres, this normal is simply parallel to the line joining their centers. 

One final tip is that the discussion above assumes the ball is bouncing off a stationary object. If the object itself is moving, like our car, then all of the math is the same, but rather than using the ball's velocity in the global reference frame of the soccer pitch, we use the ball's velocity relative to the car.

In summary, your ball-car collision routine should follow these steps, each of which involves the kind of 3D graphics math, working with points and vectors, that we have been learning about in class.

- Detect that the two spheres have collided (and probably penetrated each other).
- "Correct" the collision by adjusting the ball's position so that it is no longer inside the car sphere.
- Compute the relative velocity of the ball, vrel = vball – vcar.
- Reflect the relative velocity about the collision normal
- Set the new velocity of the ball, vball = vcar + vrel.

#### Simulating Extreme Cases

You will not be graded on how you handle multiple simultaneous collisions, such as when the ball gets squeezed between the car and the wall; this can be a challenge to handle even in real games. We will only grade you on whether you correctly handle cases where the ball collides with one thing at a time. In any case, we have set the default sizes of the ball and car so that the center of the car is lower in *y* than the radius of the ball, which means the ball will always be able to escape upwards to get out of the "pinch" caused by multiple simultaneous collisions.

In another extreme case, the ball can sometimes appear to get "stuck" to the car. This is usually an indicator of some numerical instability in your algorithm. For example, if the ball is "inside" the car sphere at frame 1 is should bounce away and no longer be in contact with the car at frame 2. However, if you do not correct the ball's position to bring it outside of the car, or if the ball's velocity is very small, or there is some other issue and the ball does not move far enough away from the car to escape it, then you may detect another collision at frame 2. Since you reflect the velocity at each collision, this can create a situation where the ball bounces back and forth forever, never escaping the car sphere. If you encounter this, there are several ways to fix it. The key is simply to make sure the ball is outside of the car's sphere and moving away from the car at the end of your collision routine.

#### Car Driving Model

A variety of strategies can be used to control the car. We are going for something that is a good balance between realism and playability. We suggest the following.

For controls:

- Think of holding the Up Arrow key as putting your foot on the gas pedal with the car in Drive. The car should speed up until it reaches some max speed.
- Think of holding the Down Arrow key as putting you foot on the gas pedal with the car in Reverse -- again the car should speed up until it reaches some max speed, but since this will be in reverse, you might want to think of it as -maxSpeed.
- When Up or Down are not pressed, you are not giving the car any gas, so it should slow down until it stops.
- When you hold the Left Arrow or Right Arrow key this is like turning the steering wheel all the way to the left or right. The car should then turn, assuming its speed is not zero. You cannot turn a car that is not moving forward or backward.

The starter code includes a `Car` and a `Ball` class. You don't have to use these, but these are the exact versions we use in our implementation, so you might like to use them. Look at the data stored in each of these classes. Both of these classes inherent from the Three.js `Object3D` class, which provides all the standard variables one would expect for a 3D object.  Additionally, both classes store the velocity as a `Vector3` object that can be manipulated in your code to change their behavior.

You will probably want to add a sensitivity parameter to the controls. For example, in our implementation, we include variable settings for the accelerationRate and turningRate. These determine how responsive you car is. For example, if your car's accelerationRate is 20m/s, you can multiply this by *dt* to determine how much the car should accelerate this frame and modify the car's speed based on this. For the turningRate, you can do something similar, like define a turningRate of 360 degrees/s, then multiply by *dt* to see how many degrees the car should turn. However, remember the turningRate should also be tied to the speed.

## Submission

When you commit and push your assignment to GitHub, an automated script will build and deploy the production code to the `gh-pages` branch of your repository.  However, your submission is not complete until you do the following:

1. Open your repository on GitHub and go to Settings->Pages.
2. Change the source to the `gh-pages` branch, then save.

You will need to wait a few minutes for the website to deploy.  After that, make sure to test everything by pointing your web browser at the link generated for your build:

```
https://csci-4611-spring-2022.github.io/your-repo-name-here
```

If your program runs correctly, then you are finished!  The published build will indicate to the TAs that your assignment is ready for grading.  If you change your mind and want to make further changes to your code, then just set the GitHub pages source back to `None` and it will unpublish the website.

Note that the published JavaScript bundle code generated by the TypeScript compiler has been minified and obfuscated so that it is not human-readable. So, you can feel free to send this link to other students, friends, and family to show off your work!

## Acknowledgments

This assignment was based on content from CSCI 4611 Fall 2021 by [Daniel Keefe](https://www.danielkeefe.net/).

## License

Material for [CSCI 4611 Spring 2022](https://canvas.umn.edu/courses/290928/assignments/syllabus) by [Evan Suma Rosenberg](https://illusioneering.umn.edu/) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).