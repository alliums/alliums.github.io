const canvas = document.getElementById("snake-game-canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

var snake;
var keys = {};

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(()=> {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit) ) {
      fruit.pickLocation();
    }

  }, 250);
}());

window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}

))
window.addEventListener('keydown', 
    function(e){
      keys[e.code] = true;
      switch(e.code) {
        case "ArrowUp": case "ArrowDown": case "ArrowRight": case "ArrowLeft": case "Space": e.preventDefault(); break;
        default: break;
      }

    },
false
);
window.addEventListener('keyup', function(e){keys[e.code] = false;}, false);


