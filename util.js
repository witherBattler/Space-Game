function mouseOverRect(x, y, width, height, type = "center") {
    switch(type) {
        case "center":
            if(mouseX > x - width / 2 && mouseX < x + width / 2 && mouseY > y - height / 2 && mouseY < y + height / 2) {
                return true
            }
            break;
        case "corner":
            if(mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
                return true
            }
            break;
        default: 
            throw new Error("Wrong mouseOverRect type property passed")
    }
    return false
}

function simpleTriangle(x, y, width, height) {
    push()
    translate(x, y)
    triangle(-(width / 2), 0, width / 2, -(height / 2), width / 2, (height / 2))
    pop()
}

function elementInArray(element, array) {
    if(array.indexOf(element) == -1) {
        return false
    }
    return true
}

function elementIsFirst(element, array) {
    return element == array[0]
}

function elementIsLast(element, array) {
    return element == array[array.length - 1]
}

function getSpaceshipImage(type, power) {
    return spaceshipImages[power][type]
}

function getSpaceshipStatistics(type, power) {
    var speed = power == "Pink Plasma" ? 5 : 0 //20
    var bulletDamage = power == "Pink Plasma" ? 50 : 0 //100
    var bulletSpeed = power == "Pink Plasma" ? 15 : 0 //30
    var protectionLevel = power == "Pink Plasma" ? 1 : 0 //4
    var reloadTime = 120
    switch(type) {
        case "cargoship":
            speed += 5
            bulletDamage += 25
            bulletSpeed += 7.5
            protectionLevel += 2;
            reloadTime -= 90
            break;
        case "carrier":
            speed += 5
            bulletDamage += 5
            bulletSpeed += 15
            protectionLevel += 2;
            reloadTime -= 110
            break;
        case "cruiser":
            speed += 8
            bulletDamage += 35
            bulletSpeed += 6
            protectionLevel += 1.5;
            reloadTime -= 60
            break;
        case "destroyer":
            speed += 3
            bulletDamage += 50
            bulletSpeed += 3
            protectionLevel += 2;
            reloadTime -= 60
            break;
        case "shuttlenoweps":
            speed += 10
            bulletDamage += 15
            bulletSpeed += 15
            protectionLevel += 1;
            reloadTime -= 90
            break;
    }
    return {
        speed: speed,
        bulletDamage: bulletDamage,
        bulletSpeed: bulletSpeed,
        protectionLevel: protectionLevel,
        reloadTime: reloadTime
    }
}

function drawSideBarButton(textToWrite, y) {
    //Button properties
    stroke("black")
    strokeWeight(5)
    rectMode(CORNER)

    //Fill color
    fill(mouseOverRect(45, y, 220, 60, "corner") ? "#960f00" : "#c71400")

    //Drawing Button
    rect(35, y, 220, 60, 10, 10, 10, 10)
    noStroke()
    fill("black")
    textFont(ethnocentric)
    textAlign(CENTER)
    textWidth(textToWrite) < 200 ? textSize(20) : textSize(17)
    text(textToWrite, 145, y + 37)
}

function setSpaceshipSpriteAnimation(type, power) {
    spaceshipSprite.changeAnimation(power + "-" + type)
}

function manageSpaceshipMovement(spaceshipStatistics) {
    if(keyIsDown(87)){
        spaceshipSprite.setSpeed(spaceshipStatistics.speed * 1.2)
    } else {
        spaceshipSprite.setSpeed(Math.max(spaceshipSprite.getSpeed() - 0.02, 0))
    }
    if(keyIsDown(65)) {
        spaceshipSprite.rotation -= spaceshipStatistics.speed / 2
    }
    if(keyIsDown(68)) {
        spaceshipSprite.rotation += spaceshipStatistics.speed / 2
    }
    camera.position.x = spaceshipSprite.position.x
    camera.position.y = spaceshipSprite.position.y
}

function drawStarBackground() {
    starsScroll += 3
    if(starsScroll >= 500) {
        starsScroll = 0
    }
    camera.off()
    imageMode(CORNER)
    image(starBackground, 0, starsScroll - 500)
    image(starBackground, 0, starsScroll)
    camera.on()
}

function drawGameBackground(x, y) {
    var initialPosition = {
        x: roundToNearest(x, 1000),
        y: roundToNearest(y, 1000)
    }
    image(gameStarBackground, initialPosition.x, initialPosition.y)
    image(gameStarBackground, initialPosition.x - 1000, initialPosition.y)
    image(gameStarBackground, initialPosition.x, initialPosition.y - 1000)
    image(gameStarBackground, initialPosition.x - 1000, initialPosition.y - 1000)
    image(gameStarBackground, initialPosition.x + 1000, initialPosition.y + 1000)
    image(gameStarBackground, initialPosition.x, initialPosition.y + 1000)
    image(gameStarBackground, initialPosition.x + 1000, initialPosition.y)
    image(gameStarBackground, initialPosition.x - 1000, initialPosition.y + 1000)
    image(gameStarBackground, initialPosition.x + 1000, initialPosition.y - 1000)
}

function drawSpeedGUI() {
    camera.off()
    fill("darkred")
    stroke("white")
    strokeWeight(5)
    rectMode(CORNER)
    rect(-2.5, -2.5, 200, 60, 0, 0, 50, 0)
    textAlign(LEFT, TOP)
    noStroke()
    textFont(ethnocentric)
    fill("white")
    textSize(30)
    text(spaceshipSprite.getSpeed().toFixed(1) + " km/s", 0, 10)
    camera.on()
}

function updateMapGui() {
    camera.off()
    guiMapImage.clear()
    guiMapImage.rectMode(CENTER)
    guiMapImage.noFill()
    guiMapImage.strokeWeight(6)
    guiMapImage.stroke("white")
    guiMapImage.rect(100, 100, 200, 200)
    guiMapImage.push()
    guiMapImage.translate((spaceshipSprite.position.x / 4500 * 200) + 100, (spaceshipSprite.position.y / 4500 * 200) + 100)
    guiMapImage.angleMode(DEGREES)
    guiMapImage.rotate(spaceshipSprite.rotation + 45)
    guiMapImage.imageMode(CENTER)
    guiMapImage.tint("yellow")
    guiMapImage.image(mapArrowImage, 0, 0, 20, 20) 
    guiMapImage.pop()
    camera.on()
}

function drawBorders() {
    rectMode(CENTER)
    stroke("red")
    strokeWeight(1000)
    noFill()
    rect(0, 0, 5000, 5000)
}

function drawMapGui() {
    camera.off()
    imageMode(CENTER)
    image(guiMapImage, 1075, 125)
    camera.on()
}

function roundToNearest(toRound, roundTo) {
    return Math.round(toRound / roundTo) * roundTo;
}

function manageBulletCreation() {
    if(keyIsDown(32)){
        attemptBulletCreation()
    }
}

function attemptBulletCreation() {
    if(Math.abs(lastBulletFrame - frameCount) > spaceshipStatistics.reloadTime) {
        createBullet(spaceshipSprite.position.x, spaceshipSprite.position.y, spaceshipSprite.rotation, spaceshipStatistics.bulletSpeed)
    }
}

function createBullet(x, y, direction, speed) {
    var newBullet = createSprite(x, y, 20, 5)
    newBullet.shapeColor = "red"
    newBullet.rotateToDirection = true
    newBullet.addSpeed((speed + newBullet.getSpeed()) * 2, direction)
    allBullets.add(newBullet)
    lastBulletFrame = frameCount
}

function drawAllEnemies() {
    for(var i = 0; i != Object.keys(allEnemiesGroups).length; i++) {
        drawSprites(allEnemiesGroups[Object.keys(allEnemiesGroups)[i]])
    }
}

function updateAllEnemies() {
    for(var i = 0; i != Object.keys(allEnemiesGroups).length; i++) {
        for(var x = 0; x != allEnemiesGroups[Object.keys(allEnemiesGroups)[i]].length; x++){
            updateEnemy(allEnemiesGroups[Object.keys(allEnemiesGroups)[i]][x])
        }
    }
}

function createClawStriker(x, y) {
    var clawStriker = createSprite(x, y)
    clawStriker.addImage("clawStriker", allEnemiesAnimations.clawStrikers)
    clawStriker.scale = 0.3
    clawStriker.changeAnimation("clawStriker")
    clawStriker.enemyType = "clawStriker"
    clawStriker.addSpeed(6, degrees(atan2(spaceshipSprite.position.y - y, spaceshipSprite.position.x - x)))
    clawStriker.cooldown = 250
    allEnemiesGroups.clawStrikers.add(clawStriker)
}

function updateEnemy(enemy) {
    switch(enemy.enemyType) {
        case "clawStriker":
            updateClawStriker(enemy)
            break;
        default: 
            throw new Error("Why is enemy type bad")
            break;
    }
}

function updateClawStriker(enemy) {
    enemy.cooldown++
    if(enemy.overlap(spaceshipSprite)) {
        enemy.cooldown = 0
    }
    if(enemy.cooldown > 120) {
        if(dist(enemy.position.x, enemy.position.y, spaceshipSprite.position.x, spaceshipSprite.position.y) > 500) {
            enemy.setSpeed(4, degrees(atan2(spaceshipSprite.position.y - enemy.position.y, spaceshipSprite.position.x - enemy.position.x)))
        } else {
            enemy.setSpeed(6, degrees(atan2(spaceshipSprite.position.y - enemy.position.y, spaceshipSprite.position.x - enemy.position.x)))
        }
        enemy.rotation = degrees(atan2(spaceshipSprite.position.y - enemy.position.y, spaceshipSprite.position.x - enemy.position.x)) + 90
    } else {
        enemy.setSpeed(0)
    }
}