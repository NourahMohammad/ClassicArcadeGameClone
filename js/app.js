// The player must avoid our enemies
var Enemy = function(x, y, speed) {
    // X and Y paramaters as placeholders
    this.x = x;
    this.y = y;

    // Load the enemy image
    this.sprite = 'images/enemy-bug.png';

    // Width and Height are added to detect collisions
    this.width = 60;
    this.height = 40;

    //  speed
    this.speed = 2;
    this.speed = (Math.random() + 1) * this.speed * 200;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // X coordinates are used to reset the enemies position after they move off of the canvas
    if (this.x < 500) {
        this.x += this.speed * (dt);
    } else {
        this.x = -200;
    }
};


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

// Creating our player
var Player = function(x, y) {

    // X and Y paramaters as placeholders
    this.x = x;
    this.y = y;

    // Set the players initial score to 0
    this.score = 0;

    // Load the player image
    this.sprite = 'images/char-princess-girl.png';

    // Width and Height are added to detect collisions
    this.width = 60;
    this.height = 40;

    // Initial speed
    this.speed = 1;
};

// Update the player position once the character hits the water.
// Since the water is not moving and is static we use the player Y coordinate
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.reset(202, 405); // setting the Y coordinate >
        this.score += 100; // adds to score when player hits water
        console.log(this.score);
        document.getElementById("score").innerHTML = this.score;
    }
};

var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Player movement is the same width and height of the canvas squares
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= TILE_WIDTH;
    }
    if (direction === 'right' && this.x < 300) {
        this.x += TILE_WIDTH;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= TILE_HEIGHT;
    }
    if (direction === 'down' && this.y < 300) {
        this.y += TILE_HEIGHT;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(-200, 55, 1),
    new Enemy(-200, 140, 1),
    new Enemy(-200, 225, 1)
];


// Place the player object in a variable called player
var player = new Player(202, 405);

// Reset players position after collision with enemies
Player.prototype.reset = function(x, y) {
    if (this.y> 0) {
        this.score -= 50;
        document.getElementById('score').innerHTML = this.score;
    }
    this.x = x;
    this.y = y;
};

// Checks collisions between player and Enemy
function checkCollisions(Enemy, player) {
    for (var i = 0; i < Enemy.length; i++) {
        if (Enemy[i].x < player.x + player.width &&
            Enemy[i].x + Enemy[i].width > player.x &&
            Enemy[i].y < player.y + player.height &&
            Enemy[i].height + Enemy[i].y > player.y) {
            player.reset(202, 405);
        }
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
