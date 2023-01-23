# Edge and collision detection

In this practical, you are required to operate autonomously, research and deliver a gameLoop, with a moving character that detects the edge of the canvas, and that detects collision with objects / obstacles in the game.

Your practical submission will be one functioning gameLoop page, where a moving character (controlled by keyboard input) does not disappear over the edge of the canvas, and produces, at least, a `console.log()` output when colliding with an obstacle.

A better grade will be awarded if a visual effect is produced when the character collides with the obstacle.

## Task 1 edge detection:

Limit the movement of your character to stay within the boundaries of the canvas.

Consider the following questions to help you build your response:

- How is a character's position currently 'held' in the gameLoop?
- What are the boundaries of the canvas set by?
- Where in the gameLoop should/could you check for edges/boundaries?
- In pseudo-code, what would the conditions for keeping the character in the boundaries be?
- How 'big' is your character?

## Task 2 collision detection:

Position a static gameObject in the canvas and build a logic that can detect if the character collides with the static object.

This second task is arguably more complicated, but the same process of 'speaking out the problem' will help you deliver your answer:

- How do we know where the character is in the canvas?
- How do we know where the obstacle is in the canvas?
- How big is the character? How big is the obstacle?
- What will the conditions to check for collision have to check for? Start with pseudo code.

A supporting document called `collision-detection.md` is published in this folder to help you work out his task.
