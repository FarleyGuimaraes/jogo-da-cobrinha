let score = document.querySelector('#score');

var audio = document.createElement("audio");

function somComida(){
    audio.src = 'coin.mp3';
    audio.play();
}

function somGameOver(){
    audio.src = 'smw-exit.mp3';
    audio.play();
}

const sprites = new Image();
sprites.src = "./snake-graphics.png";

let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....

let box = 32;

let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box,
    /*direction: {
      x: 1,
      y:0
    }*/
}

let direction = "right";

let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 18*box, 18*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){

    let spriteHeadPosition = {
        x: 254,
        y: 0,
    }

    /*if (snake[0].direction.x === 1)
        spriteHeadPosition = { x: 256, y: 0 } //head sprite right
    if (snake[0].direction.x === -1)
        spriteHeadPosition = { x: 192, y: 64 } //head sprite left
    if (snake[0].direction.y === 1)
        spriteHeadPosition = { x: 256, y: 64 } //head sprite down
    if (snake[0].direction.y === -1)
        spriteHeadPosition = { x: 192, y: 0 } //head sprite up*/

  
    if (direction == "right")
        spriteHeadPosition = { x: 256, y: 0 } //head sprite right
    if (direction == "left")
        spriteHeadPosition = { x: 192, y: 64 }  //head sprite left
    if (direction == "down")
        spriteHeadPosition = { x: 256, y: 64 } //head sprite down
    if (direction == "up")
        spriteHeadPosition = { x: 192, y: 0 } //head sprite up

    context.drawImage(
        sprites,
        spriteHeadPosition.x, spriteHeadPosition.y,
        64, 64,
        snake[0].x, snake[0].y,
        box, box
    );

    for (i = 1; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

}

function pontuou() {
    //score.innerHTML = (snake.length.toFixed(0.3));
    score.innerText = snake.length.toLocaleString('pt-BR', {minimumIntegerDigits: 3, useGrouping:false});
}

function drawFood (){
    //context.fillStyle = "red";
    //context.fillRect(food.x, food.y, box, box);

    context.drawImage(
        sprites,           //spritesheet
        0, 192,            // x = 0 y = 192 (64+64+64) posição inicial do recorte
        64, 64,            // tamanho do recorte no nosso spritesheet
        food.x, food.y,    //posição da comida
        box,box            // tamanho da comida
      );
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';

   /* if(event.keyCode == 37 && snake[0].direction.x != 1)
       snake[0].direction = { x : -1 , y : 0 }; //left  
    if(event.keyCode == 38 && snake[0].direction.y != 1)
       snake[0].direction = { x : 0 , y : -1 }; //up  
    if(event.keyCode == 39 && snake[0].direction.x != -1) 
       snake[0].direction = { x : 1 , y : 0 }; //right  
    if(event.keyCode == 40 && snake[0].direction.y != -1)
       snake[0].direction = { x : 0 , y : 1 }; //down*/
}

function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    /*if(snake[0].x > 15*box && snake[0].direction.x == 1) snake[0].x = 0;
    if(snake[0].x < 0 && snake[0].direction.x == -1) snake[0].x = 16 * box;
    if(snake[0].y > 15*box && snake[0].direction.y == 1) snake[0].y = 0;
    if(snake[0].y < 0 && snake[0].direction.y == -1) snake[0].y = 16 * box;*/
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            somGameOver();
            //alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

   /* if(snake[0].direction.x == 1) snakeX += box;
    if(snake[0].direction.x == -1) snakeX -= box;
    if(snake[0].direction.y == -1) snakeY -= box;
    if(snake[0].direction.y == 1) snakeY += box;*/

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        pontuou();
        somComida();
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY,
        /*direction: {
            x: snake[0].direction.x,
            y: snake[0].direction.y
        }*/
    }

    snake.unshift(newHead); //método unshift adiciona ...

    
    //snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);