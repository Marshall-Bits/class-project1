# Basic Game

On this exercise we are going to learn how to move elements using DOM manipulation.

We have a player that can move around the screen using the arrow keys.

Every certain amount of time, a new reward will appear on the screen.

The player can collect the reward by moving over it.

The reward will disappear after collecting it.

## Collission detection algorithms

You'll find two different algorithms to detect collissions between two elements.

The first one is a simple one, that only works with rectangles.

The second one is more complex, but it works with circles

### Collission detection for squares

```javascript
function collissionDetectionForSquares() {
    const player = document.getElementById("player")
    // In this case we check the collission with the reward that is already on the page
    const reward = document.getElementById("reward")

    const playerPosition = player.getBoundingClientRect();
    const rewardPosition = reward.getBoundingClientRect();


    // COLLISSION DETECTION STANDARD ALGORITHM (SQUARE VS SQUARE)
    if (
        playerPosition.x < rewardPosition.x + rewardPosition.width &&
        playerPosition.x + playerPosition.width > rewardPosition.x &&
        playerPosition.y < rewardPosition.y + rewardPosition.height &&
        playerPosition.y + playerPosition.height > rewardPosition.y
    ) {
        console.log('COLLISSION DETECTED');
    }

}
```


### Collission detection for circles

```javascript
function collissionDetectionForCircles() {
    const player = document.getElementById('player');
    const rewards = document.getElementsByClassName('reward');

    // Calculate the center coordinates of the player circle
    const playerX = player.offsetLeft + player.offsetWidth / 2;
    const playerY = player.offsetTop + player.offsetHeight / 2;

    // Loop through all rewards and check for collisions
    for (const reward of rewards) {
        // Calculate the center coordinates of the reward circle
        const rewardX = reward.offsetLeft + reward.offsetWidth / 2;
        const rewardY = reward.offsetTop + reward.offsetHeight / 2;

        // Calculate the distance between the two circles' centers
        const distance = Math.sqrt((playerX - rewardX) ** 2 + (playerY - rewardY) ** 2);

        // Calculate the minimum distance needed for a collision (sum of the radii)
        const minDistance = player.offsetWidth / 2 + reward.offsetWidth / 2;

        // If the distance is less than the minimum distance, a collision is detected
        if (distance < minDistance) {
            console.log('Collision detected!');
            // You can perform any desired action when a collision is detected here

            // Remove the reward from the DOM
            reward.remove();
        }
    }
}
```