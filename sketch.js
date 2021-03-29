var balloon,balloonImage1,balloonImage2,balloonImage3;
var bg;
var database,position;

function preload() {

   bg = loadImage("cityImage.png");
   balloonImage1 = loadImage("HotAirBalloon-01.png");
   balloonImage2 = loadImage("HotAirBalloon-02.png");
   balloonImage3 = loadImage("HotAirBalloon-03.png");

}

function setup(){
    database = firebase.database();
    createCanvas(500,1000);

    balloon = createSprite(250,400,50,50);
    balloon.addImage("HotAirBalloon-01.png",balloonImage1);
    var balloonPosition = database.ref('balloon/height');
    balloonPosition.on("value",readHeight,showError);

}
function draw(){
    background("bg");

    textSize(35);
    stroke("Blue");
    strokeWeight(15);
    fill("red");
    text("*Press Arrow Keys To Move The Air Balloon",200,70);

    if(keyDown(LEFT_ARROW)){
        balloon.x = balloon.x-10;
    }
    else if(keyDown(RIGHT_ARROW)){
        balloon.x = balloon.x+10;
    }
    else if(keyDown(UP_ARROW)){
        updateHeight(0,-10);
        balloon.addImage("HotAirBalloon-02.png",balloonImage2);
        balloon.scale = balloon.scale -0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        updateHeight(0,+10);
        balloon.addImage("HotAirBalloon-03.png",balloonImage3);
        balloon.scale = balloon.scale +0.01;
    }
   drawSprites();
}

function updateHeight(x,y){
    database.ref('balloon/height').set({
        'x': height.x+x,
        'y': height.y+y

    })
}

function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
}

function showError(){
    console.log("Error in writing to the database");
}