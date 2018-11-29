var dstar;
var enemies = [];
var lasers = [];
var gameover;
var space;
var score = 0;
var font;
var boom;
var life = 3;
var bonus = [];
var bonuss;
var firing;
var boost;
var level = 1; //ETAPA 09: Mudança de telas
var screen = 0;
var time = 60000;
var multiplicador = 1;
var dead;

function preload() {
    space = loadImage("sprites/space.png");
    gameover = loadImage("sprites/gameover.png");
    font = loadFont("sprites/font.ttf");
    boom = loadSound("sprites/boom.mp3");
    shot = loadSound("sprites/shot.mp3");
    bonuss = loadSound("sprites/bonus.mp3");
    firing = loadSound("sprites/imfiringmylaser.mp3");
    boost = loadSound("sprites/boost.mp3");
    dead = loadSound("sprites/dead.mp3");

}

function setup() {
    createCanvas(windowWidth - 10, windowHeight - 8);
    dstar = new Dstar();
    for (var i = 0; i < 5; i++) {
        enemies.push(new Enemy());
  
    }
    setInterval(newAsteroids, time);
}

function newAsteroids() {
    if (screen == 1) {
        enemies.push(new Enemy());

        if (time > 500) {
            time -= 500;
        }
    }
}

function draw() {
    background(space);
    if (screen == 0) { //Tela de start
        textFont(font);
        textSize(250);
        fill(255);
        text("START", (windowWidth - 10)/5, (windowHeight - 8)/2);
        textSize(20);
        fill(255);
        text("A Frota Instelar tem uma missão para você e sua equipe, destrua os asteroids que ameassam a terra com a sua nave Dstar",(windowWidth - 10)/12, (windowHeight - 8)/1.5);
        textSize(20);
        fill(255);
        text("Press ENTER to start", (windowWidth - 10)/12, (windowHeight - 8)/1.25);
    }

    if (screen == 1) { //Tela do jogo
        if (score > level * 2500) {
            bonus.push(new Bonus());
            firing.play();

            // ETAPA 08 ADIÇÃO DE ETAPAS, as etapas são infinitas, quando vcchega num multiplo de 2500 nos pontos vc passa de fase;
            level++;
            multiplicador++;
        }

        for (var i = 0; i < enemies.length; i++) {
            if (dstar.hits(enemies[i])) {
               dead.play();
               screen=2;
                
               
            }

            enemies[i].render();
            enemies[i].update();
            enemies[i].edges();
        }

        for (var k = 0; k < bonus.length; k++) { //ETAPA 07 quando se passa de fase aparecem asteroids especiais que valem mais pontos
            if (dstar.hits(bonus[k])) {
                score = score + 2000; // se a nave bate no asteroide ganha 2000 pontos
            }

            bonus[k].render();
            bonus[k].update();
            bonus[k].edges();
        }

        for (var i = lasers.length - 1; i >= 0; i--) {
            lasers[i].render();
            lasers[i].update();
            for (var j = enemies.length - 1; j >= 0; j--) {
                if (lasers[i].hits(enemies[j])) {
                    if (enemies[j].r > 20) {
                        boom.play(); //efeito sonoro quando o asteroide é destruído
                        var newEnemies = enemies[j].breakup();
                        enemies = enemies.concat(newEnemies);
                        score = score + 100; //contagem de score ETAPA 06 o asteroide comum vale 100 pontos
                    }

                    enemies.splice(j, 1);
                    lasers.splice(i, 1);
                    break;
                }
            }
        }

        

        for (var t = lasers.length - 1; t >= 0; t--) {
            lasers[t].render();
            lasers[t].update();
            for (var k = bonus.length - 1; k >= 0; k--) {
                if (lasers[t].hits(bonus[k])) {
                    
                        bonuss.play(); //efeito sonoro quando o asteroide bonus é destruído
                        score = score + 1000; //o asteroide bonus vale 1000 pontos
                    

                    bonus.splice(k, 1);
                    lasers.splice(t, 1);
                    break;
                }
            }
        }

        dstar.render();
        dstar.turn();
        dstar.update();
        dstar.edges();
        textFont(font); //etapa 05
        textSize(20);
        fill(255);
        text("Score: " + score, 300, 30); //add score
        text("Level: " + level, 900, 30); // add etapa
        if(score==500000000){
           textFont(font);
            textSize(250);
            fill(200, 0, 0);
            text("GET A LIFE",500,200); 
        }
    }
    if (screen==2){ // Tela de game over
    //image(gameover, 0,0);
                
    textFont(font);
    textSize(250);
    fill(200, 0, 0);
    text("YOU"+"\n"+"ARE"+"\n"+"DEAD",500,200);
                // // // //    textSize(30);
                //    fill(255);
                // //   text("Press X to play again",500,900);
    }
}

function keyReleased() {
    dstar.setRotation(0);
    dstar.boosting(false);
    if (!shot.isPlaying()) {
        shot.stop();
    }if(!dead.isPlaying()) {
        dead.stop();
    }
}

// ETAPA 2 - MOVIMENTAÇÃO DO JOGADOR
function keyPressed() {
    if (key == " ") {
        lasers.push(new Laser(dstar.pos, dstar.heading));
        shot.play();
    } else if (keyCode == RIGHT_ARROW) {
        dstar.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        dstar.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        dstar.boosting(true);
        boost.play(0.001);
    } else if (!keyCode == UP_ARROW) {
        boost.stop();
    } else if (keyCode == ENTER) {
        screen=1;
    } else if (keyCode == BACKSPACE){
        screen=0;
    }
}
