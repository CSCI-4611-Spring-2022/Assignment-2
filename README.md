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

​		**3D Drawing**

1. Draw lines around the boundary of the 3D soccer pitch so that we can see the box that we will be playing inside.  You can use `Line` class in Three.js for this. Note that in newer versions of OpenGL, the line thickness is always drawn as 1 pixel wide. (2)

2. Draw a grid of lines for each goal.  In the example program, the `BoxGeometry` class was used to create `Mesh` objects that appear as thicker lines.  However, you may also use the `Line` class if you want. (2)

   **Ball Physics**

3. Make the ball move through the air based on a random initial velocity, and relaunch the ball when the space bar is pressed. (1)

4. Update the ball's position and velocity each time step based on the acceleration due to gravity. (2)

5. Detect contacts between the ball and the ground, and make the ball bounce in the correct direction. That is, the ball's velocity vector should be reflected about the normal of the ground. (1)

6. Detect when the ball hits the walls and the ceiling and make it bounce off them too. (1)

7. Decrease the speed of the ball when it bounces. This is due to friction and other factors, but you do not need to simulate these; just decrease the speed by some constant. We used 80% in our implementation. (1)

8. When the ball hits one of the goals, reset the car to the initial position and relaunch the ball from the center of the pitch. You don't have to animate the ball actually going *into* the goal, just detect when the ball enters these special rectangular regions. (2)

   **Car Driving**

9. Give the car a more realistic driving model. The car should always move forwards or backwards relative to the direction it's facing, but never sideways. The up and down arrow keys should change its speed, while left and right should turn it at a rate proportional to its speed. One approach for doing this is described at the end of the technical discussion. (2)

10. Prevent the car from leaving the bounds of the playing area. (2)

    **Car-Ball Collisions**

11. Detect contact between the ball and the car using the sphere-sphere collision approach described in more detail in the section below.(2)

12. Compute the new velocity of the ball after the collision with the car according to the formula described in more detail in the section below. (2)

## Wizard Bonus Challenge

All of the assignments in the course will include great opportunities for students to go beyond the requirements of the assignment and do cool extra work. On each assignment, you can earn **one bonus point** for implementing a meaningful new feature to your program. This should involve some original new programming, and should not just be something that can be quickly implemented by copying and slightly modifying existing code.  

There are some great opportunities for extra work in this assignment. Turn this program into a more exciting game! Add some wheels and brake lights to your car. Change the camera position to follow the car and/or point to the ball! Add a car for a second player! Draw some fireworks when a goal is scored before resetting the ball! Keep count of the score by drawing some tokens above or next to the goals!  Or, even better, think of your own cool, creative idea!

A single point may not sound like a lot, but keep in mind that on a 20-point scale, this is equivalent to a 5% bonus! Make sure to document your wizard functionality in the Submission Information portion of this readme file, so that the TAs know what to look for when they grade your program.

The wizard bonus challenge also offers you a chance to show off your skills and creativity!  While grading the assignments the TAs will identify the best four or five examples of people doing cool stuff with computer graphics. We call these students our **wizards**, and after each assignment, the students selected as wizards will have their programs demonstrated to the class.

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