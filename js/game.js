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
var hitbonus;
var levelsound;
var boost;
var level = 1;
var screen = 0; //ETAPA 09: Mudança de telas
var time = 600;
var multiplicador = 1;
var hitasteroid;
var explosion = [];
var restart;
var star;
var arrows;
var spacebar;
var up;
var beep;




function preload() {
    space = loadImage("sprites/space.png");
    gameover = loadImage("sprites/gameover.png");
    font = loadFont("sprites/font.ttf");
    boom = loadSound("sprites/boom.mp3");
    shot = loadSound("sprites/shot.mp3");
    hitbonus = loadSound("sprites/hitbonus.mp3");
    levelsound = loadSound("sprites/level.mp3");
    boost = loadSound("sprites/boost.mp3");
    hitasteroid = loadSound("sprites/hitasteroid.mp3");
    restart = loadSound("sprites/restart.mp3");
    start = loadSound("sprites/start.mp3");
   spacebar = loadImage ("sprites/spacebar.png");
   arrows = loadImage ("sprites/arrow.png");
   up = loadImage ("sprites/arrows.png");
   beep = loadSound("sprites/beep.mp3");
    for (var i = 0; i < 6; i++) { //ETAPA 10 ANIMAÇÃO DA EXPLOSÃO
        explosion[i] = loadImage("sprites/boom" + i + ".png");
    }
}

function setup() {
    frameRate(25);
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

        if (time > 200) {
            time --;
        }
    }
}


function draw() {
    
    background(space);
    if (screen == 0) { //Tela de start
        textFont(font);
        textSize(150);
        fill(255);
        text("ASTEROIDS", (windowWidth - 10) / 12, (windowHeight - 8) / 2);
        textSize(20);
        fill(255);
        text("Você foi promovido a capitão!!! \n E a Frota Estelar tem uma missão para você e sua equipe,\ndestrua os asteróides que ameaçam a Terra com a sua nova nave Dstar", (windowWidth - 10) / 12, (windowHeight - 8) / 1.5);
        textSize(50);
        fill(255);
        text("Press ENTER to start", (windowWidth - 10) / 12, (windowHeight - 8) / 1.05);
    }
    if(screen ==1){
        image(arrows,(windowWidth - 10)/2, (windowHeight - 8) / 15);
        image(up,(windowWidth - 10)/1.25, (windowHeight - 8) / 15);
        image(spacebar, (windowWidth - 10)/2, (windowHeight - 8) / 2);
        textFont(font);
        textSize(30);
        fill(255);
        text("Setas para esquerda e direita\ngiram a nave \n Seta para cima\nliga os propulsores", (windowWidth - 10) / 15, (windowHeight - 8) / 5);
        text("Barra de espaço\nativa os lasers", (windowWidth - 10) / 15, (windowHeight - 8) / 1.75);
        textSize(50);
        fill(255);
        text("Press ENTER to start", (windowWidth - 10) / 15, (windowHeight - 8) / 1.05);
    }

    if (screen == 2) { //Tela do jogo
        
        if (score > level * 2500) {
            levelsound.play();
            for (var i = 0; i < level; i++) {
            bonus.push(new Bonus());
        }
            

            // ETAPA 08 ADIÇÃO DE ETAPAS, as etapas são infinitas, quando vcchega num multiplo de 2500 nos pontos vc passa de fase;
            level++;
            multiplicador++;
        }

        for (var i = 0; i < enemies.length; i++) {
            if (dstar.hits(enemies[i])) {
                hitasteroid.play();
                screen = 3;


            }

            enemies[i].render();
            enemies[i].update();
            enemies[i].edges();
        }

        for (var k = 0; k < bonus.length; k++) { //ETAPA 07 quando se passa de fase aparecem asteroids especiais que valem mais pontos
            if (dstar.hits(bonus[k])) {
                hitasteroid.play();
                screen = 3;
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
                    if (enemies[j].r > 30) {
                        var newEnemies = enemies[j].breakup();
                        enemies = enemies.concat(newEnemies);
                        score = score + 100; //contagem de score ETAPA 06 o asteroide comum vale 100 pontos
                      
                    }
                    for (var k = 0; k < 6; k++) {
                        image(explosion[k], (enemies[j].pos.x-250), (enemies[j].pos.y-200));
                       
                    }
                    boom.play(); //efeito sonoro quando o asteroide é destruído
                    score = score + 100;
                    enemies.push(new Enemy());
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

                    hitbonus.play(); //efeito sonoro quando o asteroide bonus é destruído    
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
        if (score == 500000000) {
            textFont(font);
            textSize(250);
            fill(200, 0, 0);
            text("GET A LIFE", 500, 200);
        }
    }
    if (screen == 3) { // Tela de game over
        background(gameover);
        score=0;
        level=1;
    }
}

function keyReleased() {
    dstar.setRotation(0);
    dstar.boosting(false);
    if (!shot.isPlaying()) {
        shot.stop();
    }if (!boom.isPlaying()) {
        boom.stop();
    }
}

// ETAPA 2 - MOVIMENTAÇÃO DO JOGADOR
function keyPressed() {
    if(screen==2){
        if (key == " ") {
            lasers.push(new Laser(dstar.pos, dstar.heading));
            shot.play();
        } else if (keyCode == RIGHT_ARROW) {
            dstar.setRotation(0.1);
        } else if (keyCode == LEFT_ARROW) {
            dstar.setRotation(-0.1);
        } else if (keyCode == UP_ARROW) {
            dstar.boosting(true);
            boost.play();
        } else if (!keyCode == UP_ARROW) {
        boost.stop();
        }
    }else if(screen==0){
         if (keyCode == ENTER) {
            
                if (enemies == [] || enemies == 0) {
                    for (var i = 0; i < 1; i++) {
                         enemies.push(new Enemy());
            }
        }
        screen = 1;
        beep.play();
    }
}else if (screen==1){
     if (keyCode == ENTER) {
        screen=2
        start.play();
        }
     
 
}else if(screen==3){
    if (keyCode == ENTER) {
        enemies = [];
        bonus = [];
        restart.play();
        screen = 0;
        boost.stop();
        boom.stop();
        shot.stop();
        hitbonus.stop();
        levelsound.stop();
       
        }
    } 
} 
