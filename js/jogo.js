var dstar;
var enemies = [];
var lasers = [];
var gameover;
var space;
var score=0;
function preload(){
    space=loadImage("sprites/space.png");
    gameover=loadImage("sprites/dead.png");
}
function incrementScore(){
    score++;
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    dstar = new Dstar();
    for (var i = 0; i < 5; i++) {
        enemies.push(new Enemy());
    }
}


function draw() {
    background(space);  
    

    for (var i = 0; i < enemies.length; i++) {
        if (dstar.hits(enemies[i])) {
            image(gameover,0,0);
            alert("GAME OVER");
            document.location.reload();
            
        }
        enemies[i].render();
        enemies[i].update();
        enemies[i].edges();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        for (var j = enemies.length - 1; j >= 0; j--) {
            if (lasers[i].hits(enemies[j])) {
                if(enemies[j].r > 10) {
                    var newEnemies = enemies[j].breakup();
                    enemies = enemies.concat(newEnemies);
                }
                enemies.splice(j, 1); 
                lasers.splice(i, 1);
                break;
                
            }
        }
    }

    dstar.render();
    dstar.turn();
    dstar.update();
    dstar.edges();

}



function keyReleased() {
    dstar.setRotation(0);
    dstar.boosting(false);
}

// ETAPA 2 - MOVIMENTAÇÃO DO JOGADOR
function keyPressed() {
    if (key == ' ') {
        lasers.push(new Laser(dstar.pos, dstar.heading));
    } else if (keyCode == RIGHT_ARROW) {
        dstar.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        dstar.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        dstar.boosting(true);
    }
}