var canvas
var stage = "menu"
var starBackground
var ethnocentric
var spaceshipImages
var lockImage
var spaceshipConfiguration = {
    type: "cargoship",
    power: "Magma"
}

function setup() {
    canvas = createCanvas(1200, 500)
    canvas.parent('sketch-holder')
    starBackground = createGraphics(1200, 500)
    starBackground.background("black")
    for(var i = 0; i != 500; i++) {
        starBackground.circle(random(0, 1200), random(0, 500), 3)
    }
    ethnocentric = loadFont("fonts/ethnocentric.otf")
    spaceshipImages = {
        "Magma": {
            cargoship: loadImage("sprites/magma/cargoship.png"),
            carrier: loadImage("sprites/magma/carrier.png"),
            cruiser: loadImage("sprites/magma/cruiser.png"),
            destroyer: loadImage("sprites/magma/destroyer.png"),
            shuttlenoweps: loadImage("sprites/magma/shuttlenoweps.png")
        },
        "Pink Plasma": {
            cargoship: loadImage("sprites/pinkPlasma/cargoship.png"),
            carrier: loadImage("sprites/pinkPlasma/carrier.png"),
            cruiser: loadImage("sprites/pinkPlasma/cruiser.png"),
            destroyer: loadImage("sprites/pinkPlasma/destroyer.png"),
            shuttlenoweps: loadImage("sprites/pinkPlasma/shuttlenoweps.png")
        }
    }
    lockImage = loadImage("sprites/lock.png")
}

function draw() {
    switch(stage) {
        case "menu":
            drawMenuUI()
            break;
    }
}

function mousePressed() {
    uiMousePressed()
}

function mouseMoved() {
    uiMouseMoved()
}