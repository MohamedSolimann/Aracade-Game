// function showCoords (event){
//     var x = event.clientX;
//     var y = event.clientY;
// }





// Enemies our player must avoid

var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x  += this.speed * dt;
    //When the Enemy finishes the lane it return back from the other side
    if (this.x > 510){
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
    //testing collision
    if (player.y < this.y + 50 &&
        player.y + 50 > this.y &&
        player.x < this.x + 79 &&
        player.x + 79 > this.x
        ) {
        player.x = 202;
        player.y = 405;
        alert('You Lose!');
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.player = 'images/char-boy.png';
    }
    update(dt){
  
        
    }
    render(){
        ctx.drawImage(Resources.get(this.player) , this.x, this.y);
    }
    handleInput(keyPress){
        if(keyPress == 'right'&& this.x <406){
            this.x += 102;
        }
        if(keyPress == 'left' && this.x > 0){
            this.x -= 102;
        }
        if(keyPress == 'up' && this.y > 0){
            this.y -= 83;
        }
        if(keyPress == 'down' && this.y < 405){
            this.y += 83; 
        } 
        if(this.y < 0){
            setTimeout(() => {
                this.x = 202;
                this.y = 405;
                alert('You Won!');
            }, 600 );
        }

    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemiesLocation = [63 , 147 , 230];

enemiesLocation.forEach(function(yAxis){
    enemy = new Enemy (0 , yAxis , 400);
    allEnemies.push(enemy);
})

//Constructor method runs automatic when an object is created under the class 
var player = new Player(202 , 405);




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
