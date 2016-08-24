# POP TILL YOU DROP
## GA WDI22 LONDON - PROJECT 1
### Pop as many bubbles as you can in 30 seconds!

A classic time-killer in which your only challenge is to pop all the bubbles you can in the given time!

#####[Play it here!](https://poptillyoudrop.herokuapp.com)

#####Rules
Do I have to explain again? Just pop the damn bubbles! You're running out of time! And don't forget to insert your name, to challenge your mates for the highest score in the leaderboard!

#####How it works
I built the game upon timers, which randomly generate and animate a set number of bubbles every half second. All of the game is tied to a 30 seconds countdown, which sets the game over, clear the game board and prompts the user for their name. Each bubble also has a timer attached to them, which return the value in points to the player upon popping.

#####The build
* HTML 5, CSS and jQuery were used to create this game.
* A separate library has been used and modified for modals (remodal.js).
* Sounds are all in public domain (no copyright infringement!)

#####Problems and challenges
I managed to build the game pretty quickly, but some features they weren't working as intended and/or they were too hard to implement, like a lives system. Being it tied to the animation of the bubbles, sometimes was taking lives from the player quite randomly. A workaround was to implement a set timer for the user to play the game, avoiding the problematics tied to the lives system. Other features didn't make it to the final version for the same reason, like a popping animation for the bubbles. Overall, I'm happy with the final result!