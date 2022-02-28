var canvas
var stage = "menu"
var starBackground
var gameStarBackground
var ethnocentric
var spaceshipImages
var lockImage
var mapArrowImage
var spaceshipConfiguration = {
    type: "cargoship",
    power: "Magma"
}
var spaceshipSprite
var guiMapImage
var lastBulletFrame = 0
var allBullets

function setup() {
    smooth()
    canvas = createCanvas(1200, 500)
    canvas.parent('sketch-holder')
    starBackground = createGraphics(1200, 500)
    gameStarBackground = createGraphics(1000, 1000)
    gameStarBackground.background("black")
    starBackground.background("black")
    for(var i = 0; i != 500; i++) {
        starBackground.circle(random(0, 1200), random(0, 500), Math.random() * 5)
        gameStarBackground.circle(random(0, 1000), random(0, 1000),  Math.random() * 5)
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
    mapArrowImage = loadImage("sprites/maparrow.png")
    spaceshipSprite = createSprite(0, 0)
    spaceshipSprite.addImage("Magma-cargoship", spaceshipImages["Magma"]["cargoship"])
    spaceshipSprite.addImage("Magma-carrier", spaceshipImages["Magma"]["carrier"])
    spaceshipSprite.addImage("Magma-cruiser", spaceshipImages["Magma"]["cruiser"])
    spaceshipSprite.addImage("Magma-destroyer", spaceshipImages["Magma"]["destroyer"])
    spaceshipSprite.addImage("Magma-shuttlenoweps", spaceshipImages["Magma"]["shuttlenoweps"])
    spaceshipSprite.addImage("Pink Plasma-cargoship", spaceshipImages["Pink Plasma"]["cargoship"])
    spaceshipSprite.addImage("Pink Plasma-carrier", spaceshipImages["Pink Plasma"]["carrier"])
    spaceshipSprite.addImage("Pink Plasma-cruiser", spaceshipImages["Pink Plasma"]["cruiser"])
    spaceshipSprite.addImage("Pink Plasma-destroyer", spaceshipImages["Pink Plasma"]["destroyer"])
    spaceshipSprite.addImage("Pink Plasma-shuttlenoweps", spaceshipImages["Pink Plasma"]["shuttlenoweps"])
    spaceshipSprite.rotateToDirection = true
    spaceshipSprite.scale = 0.2
    spaceshipSprite.maxSpeed = 20
    guiMapImage = createGraphics(200, 200)
    allBullets = new Group()
}

function draw() {
    switch(stage) {
        case "menu":
            drawMenuUI()
            break;
        case "endless":
            drawEndless()
    }
}



function mousePressed() {
    uiMousePressed()
}

function mouseMoved() {
    uiMouseMoved()
}