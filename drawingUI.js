var starsScroll = 0


var allSpaceshipPowers = ["Magma", "Pink Plasma"]
var chosenSpaceshipPower = "Magma"
var spaceshipPowersColors = {
    "Magma": "orangered",
    "Pink Plasma": "hotpink"
}
var unlockedSpaceshipPowers = ["Magma"]

var unlockedSpaceshipTypes = ["cargoship", "shuttlenoweps", "destroyer"]
var allSpaceshipTypes = ["cargoship", "carrier", "cruiser", "destroyer", "shuttlenoweps"]



function drawMenuUI() {
    //Background
    drawStarBackground()

    //Side bar
    var alphaValue = mouseOverRect(145, height / 2, 270, 480) ? 75 : 50
    fill(color(255, 255, 255, alphaValue))
    rectMode(CENTER)
    rect(145, height / 2, 270, 480, 30, 30, 30, 30)
    
    //Title
    fill("white")
    textFont(ethnocentric)
    textAlign(CENTER)
    textSize(50)
    text("Planet Invaders", 725, 100)

    //Power choice
    elementIsFirst(chosenSpaceshipPower, allSpaceshipPowers) ? fill("grey") : fill("white")
    simpleTriangle(725 - 200, 150, 30, 40)
    elementIsLast(chosenSpaceshipPower, allSpaceshipPowers) ? fill("grey") : fill("white")
    simpleTriangle(725 + 200, 150, -30, 40)
    textSize(30)
    fill(spaceshipPowersColors[chosenSpaceshipPower])
    text(chosenSpaceshipPower, 725, 150 + 10)
    stroke("white")
    strokeWeight(3)
    line(725 - 150, 150 + 25, 725 + 150, 150 + 25)
    noStroke()
    fill("white")
    textSize(15)
    textFont("Verdana")
    text("Power", 725, 150 + 45)

    //Drawing ship types
    var homeFolder = spaceshipImages[chosenSpaceshipPower]
    imageMode(CENTER)

    elementInArray("cargoship", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers) ? noTint() : tint("dimgrey")
    image(homeFolder.cargoship, 725 - 180, 250, homeFolder.cargoship.width / 5, homeFolder.cargoship.height / 5)
    if(!elementInArray("cargoship", unlockedSpaceshipTypes) || !elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) image(lockImage, 725 - 180, 250, lockImage.width / 15, lockImage.height / 15)
    elementInArray("carrier", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers) ? noTint() : tint("dimgrey")
    image(homeFolder.carrier, 725 - 80, 250, homeFolder.carrier.width / 5, homeFolder.carrier.height / 5)
    if(!elementInArray("carrier", unlockedSpaceshipTypes) || !elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) image(lockImage, 725 - 80, 250, lockImage.width / 15, lockImage.height / 15)
    elementInArray("cruiser", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers) ? noTint() : tint("dimgrey")
    image(homeFolder.cruiser, 725, 250, homeFolder.cruiser.width / 5, homeFolder.cruiser.height / 5)
    if(!elementInArray("cruiser", unlockedSpaceshipTypes) || !elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) image(lockImage, 725, 250, lockImage.width / 15, lockImage.height / 15)
    elementInArray("destroyer", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers) ? noTint() : tint("dimgrey")
    image(homeFolder.destroyer, 725 + 95, 250, homeFolder.destroyer.width / 5, homeFolder.destroyer.height / 5)
    if(!elementInArray("destroyer", unlockedSpaceshipTypes) || !elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) image(lockImage, 725 + 95, 250, lockImage.width / 15, lockImage.height / 15)
    elementInArray("shuttlenoweps", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers) ? noTint() : tint("dimgrey")
    image(homeFolder.shuttlenoweps, 725 + 180, 250, homeFolder.shuttlenoweps.width / 5, homeFolder.shuttlenoweps.height / 5)
    if(!elementInArray("shuttlenoweps", unlockedSpaceshipTypes) || !elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) image(lockImage, 725 + 180, 250, lockImage.width / 15, lockImage.height / 15)

    //Spaceship statistics
    noTint()
    var currentSpaceshipImage = getSpaceshipImage(spaceshipConfiguration.type, spaceshipConfiguration.power)
    image(currentSpaceshipImage, 600, 400, currentSpaceshipImage.width / 2, currentSpaceshipImage.height / 2)

}

function drawStarBackground() {
    starsScroll += 3
    if(starsScroll >= 500) {
        starsScroll = 0
    }
    image(starBackground, 0, starsScroll - 500)
    image(starBackground, 0, starsScroll)
}

function uiMousePressed () {
    switch(stage) {
        case "menu":
            if(mouseOverRect(725 - 200, 150, 30, 40) && !elementIsFirst(chosenSpaceshipPower, allSpaceshipPowers)) {
                chosenSpaceshipPower = allSpaceshipPowers[allSpaceshipPowers.indexOf(chosenSpaceshipPower) - 1]
            }
            if(mouseOverRect(725 + 200, 150, 30, 40) && !elementIsLast(chosenSpaceshipPower, allSpaceshipPowers)) {
                chosenSpaceshipPower = allSpaceshipPowers[allSpaceshipPowers.indexOf(chosenSpaceshipPower) + 1]
            }
            if(mouseOverRect(725 - 180, 250, 100, 50) && elementInArray("cargoship", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) {
                spaceshipConfiguration = {type: "cargoship", power: chosenSpaceshipPower}
            }
            if(mouseOverRect(725 - 83, 250, 75, 50) && elementInArray("carrier", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) {
                spaceshipConfiguration = {type: "carrier", power: chosenSpaceshipPower}
            }
            if(mouseOverRect(725, 250, 75, 40) && elementInArray("cruiser", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) {
                spaceshipConfiguration = {type: "cruiser", power: chosenSpaceshipPower}
            }
            if(mouseOverRect(725 + 95, 250, 90, 80) && elementInArray("destroyer", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) {
                spaceshipConfiguration = {type: "destroyer", power: chosenSpaceshipPower}
            }
            if(mouseOverRect(725 + 180, 250, 90, 80) && elementInArray("shuttlenoweps", unlockedSpaceshipTypes) && elementInArray(chosenSpaceshipPower, unlockedSpaceshipPowers)) {
                spaceshipConfiguration = {type: "shuttlenoweps", power: chosenSpaceshipPower}
            }
            break;
    }
}

function uiMouseMoved() {
    switch(stage) {
        case "menu":
        var mouseIsPointer = mouseOverRect(725 - 200, 150, 30, 40) || mouseOverRect(725 + 200, 150, 30, 40)
        //Checking for spaceship mouseover's
        || mouseOverRect(725 - 180, 250, 100, 50)
        || mouseOverRect(725 - 83, 250, 75, 50)
        || mouseOverRect(725, 250, 75, 40)
        || mouseOverRect(725 + 95, 250, 90, 80)
        || mouseOverRect(725 + 180, 250, 50, 30)
        cursor(mouseIsPointer ? "pointer" : "default")
        break;
    }
}