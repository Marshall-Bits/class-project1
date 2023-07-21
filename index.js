console.log("index.js running...")

const playerElement = document.getElementById("player")

// in order to keep track of the player position, we will create an object
// in our game project we need a class for the player
const player = {
    x: 0,
    y: 0,
}

// REQUEST ANIMATION FRAME 
let frames = 0; // This is a counter that will be incremented every time the gameLoop is called
let isGameOver = false; // This variable will be set to true when the game is over


// GAME LOOP is going to be a function that will be called over and over again
function gameLoop() {
    frames++;
    // console.log(frames); // in case you want to check the frames uncomment this line

    // If I want to create a new reward every 500 frames:
    // if(frames % 500 === 0) {
    //     createNewReward()
    // }


    if (isGameOver) {
        console.log('YOU ARE A LOOSER');
    } else {
        // We want to be checking for collisions every frame
        collissionDetectionForCircles();
        // and we also want to call the gameLoop again and again
        requestAnimationFrame(gameLoop);
    }
}
gameLoop()

// This is Edna's code for creating a new reward every 3 seconds
if (!isGameOver) {
    setInterval(createNewReward, 3000)
}

// This function is going to get the key pressed as an argument and move the player accordingly
function playerMove(keyPressed) {

    switch (keyPressed) {
        case "ArrowUp":
            player.y -= 10;
            break;
        case "ArrowDown":
            player.y += 10;
            break;
        case "ArrowRight":
            player.x += 10;
            break;
        case "ArrowLeft":
            player.x -= 10;
            break;
    }

    // We update the style
    playerElement.style.left = `${player.x}px`
    playerElement.style.top = `${player.y}px`

}

function createNewReward() {
    const reward = document.createElement("div");
    document.body.appendChild(reward);
    reward.className = "reward";
    reward.style.top = Math.random() * window.innerHeight + "px"
    reward.style.left = Math.random() * window.innerWidth + "px"
}

document.addEventListener("keydown", (event) => {
    event.preventDefault(); // Prevent the default behaviour of the arrow keys
    playerMove(event.key) // Call the playerMove function and pass the key pressed as an argument
})

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


