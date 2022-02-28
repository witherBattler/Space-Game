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
    rect(-2.5, -2.5, 200, 60)
    textAlign(LEFT, TOP)
    noStroke()
    textFont(ethnocentric)
    fill("white")
    textSize(30)
    text(spaceshipSprite.getSpeed().toFixed(1) + " km/s", 0, 10)
    camera.on()
}

function drawHealthGUI() {
    camera.off()
    fill("darkred")
    stroke("white")
    strokeWeight(5)
    rectMode(CORNER)
    rect(197.5, -2.5, 200, 60, 0, 0, 30, 0)
    noStroke()
    textFont(ethnocentric)
    fill("white")
    textSize(30)
    text(Math.round(health) + "HP", 235, 10)
    camera.on()
}

function updateMapGui() {
    var enemiesPoints = getAllEnemiesLocations()
    camera.off()
    guiMapImage.background("#333333")
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
    for(var i = 0; i != enemiesPoints.length; i++) {
        guiMapImage.noStroke()
        guiMapImage.fill("red")
        guiMapImage.circle((enemiesPoints[i].x / 4500 * 200) + 100, (enemiesPoints[i].y / 4500 * 200) + 100, 5)
    }
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
    if(keyIsDown(32) || mouseIsPressed){
        attemptAttackCreation()
    }
}

function attemptAttackCreation() {
    if(Math.abs(lastBulletFrame - frameCount) > spaceshipStatistics.reloadTime) {
        createAttack(spaceshipSprite.position.x, spaceshipSprite.position.y, spaceshipStatistics.bulletSpeed)
    }
}

function createAttack(x, y, speed) {
    switch(currentAttackType){
        case "bullet":
            var newBullet = createSprite(x, y, 20, 5)
            newBullet.shapeColor = "red"
            newBullet.rotateToDirection = true
            newBullet.type = "bullet"
            newBullet.addSpeed(speed + spaceshipSprite.getSpeed(), spaceshipSprite.rotation)
            allAttackGroups.bullet.add(newBullet)
            lastBulletFrame = frameCount
            break
        case "shield":
            var newBullet = createSprite(x, y)
            newBullet.addImage("shield", shieldAnimation)
            newBullet.rotateToDirection = true
            newBullet.addSpeed(speed + spaceshipSprite.getSpeed(), degrees(atan2(camera.mouseY - shield.position.y, camera.mouseX - shield.position.x)))
            newBullet.scale = 1.2
            newBullet.trueShield = true
            allAttackGroups.shield.add(newBullet)
            lastBulletFrame = frameCount
            break;
        default: 
            throw new Error("Bad attack type (" + currentAttackType + ")")
    }
}

function drawAllEnemies() {
    for(var i = 0; i != Object.keys(allEnemiesGroups).length; i++) {
        drawSprites(allEnemiesGroups[Object.keys(allEnemiesGroups)[i]])
    }
}

function updateAllEnemies() {
    var enemiesToDelete = []
    for(var i = 0; i != Object.keys(allEnemiesGroups).length; i++) {
        for(var x = 0; x != allEnemiesGroups[Object.keys(allEnemiesGroups)[i]].length; x++){
            if(updateEnemy(allEnemiesGroups[Object.keys(allEnemiesGroups)[i]][x])) {
                enemiesToDelete.push(allEnemiesGroups[Object.keys(allEnemiesGroups)[i]][x])
            }
        }
    }
    for(var i = 0; i != enemiesToDelete.length; i++) {
        enemiesToDelete[i].remove()
    }
}

function createClawStriker(x, y) {
    var clawStriker = createSprite(x, y)
    clawStriker.addImage("clawStriker", allEnemiesAnimations.clawStrikers)
    clawStriker.scale = 0.6
    clawStriker.changeAnimation("clawStriker")
    clawStriker.enemyType = "clawStriker"
    clawStriker.addSpeed(6, degrees(atan2(spaceshipSprite.position.y - y, spaceshipSprite.position.x - x)))
    clawStriker.cooldown = 250
    clawStriker.health = 100
    clawStriker.initialHealth = 100
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
    if(updateEnemyHealth(enemy) == "enemy killed") {
        return "enemy killed"
    }
}

function updateClawStriker(enemy) {
    enemy.cooldown++
    if(enemy.overlap(spaceshipSprite)) {
        enemy.cooldown = 0
        health -= 1
    }
    if(enemy.cooldown > 120) {
        if(dist(enemy.position.x, enemy.position.y, spaceshipSprite.position.x, spaceshipSprite.position.y) > 500) {
            enemy.setSpeed(2, degrees(atan2(spaceshipSprite.position.y - enemy.position.y, spaceshipSprite.position.x - enemy.position.x)))
        } else {
            enemy.setSpeed(4, degrees(atan2(spaceshipSprite.position.y - enemy.position.y, spaceshipSprite.position.x - enemy.position.x)))
        }
        enemy.rotation = degrees(atan2(spaceshipSprite.position.y - enemy.position.y, spaceshipSprite.position.x - enemy.position.x)) + 90
    } else {
        enemy.setSpeed(0)
    }
}

function drawAllAttacks() {
    drawSprites(allAttackGroups.bullet)
    if(currentAttackType == "shield"){
        drawSprites(allAttackGroups.shield)
    }
}

function updateAllAttacks() {
    if(currentAttackType == "shield") {
        shield.position.x = spaceshipSprite.position.x
        shield.position.y = spaceshipSprite.position.y
        shield.rotation = degrees(atan2(camera.mouseY - shield.position.y, camera.mouseX - shield.position.x))
    }
}

function initiateShield() {
    shield = createSprite(spaceshipSprite.position.x, spaceshipSprite.position.y)
    shield.scale = 1.2
    shield.trueShield = false
    shield.cooldown = 120
    shield.addImage("shield", shieldAnimation)
    allAttackGroups.shield.add(shield)
}

function randomlyGenerateEnemies() {
    if(Math.random() < 0.002) {
        generateRandomEnemy()
    }
}

function generateRandomEnemy() {
    var enemyToGenerate = random(["clawstriker"])
    switch(enemyToGenerate) {
        case "clawstriker":
            createClawStriker(Math.random() * 4500 - 2250, Math.random() * 4500 - 2250)
            break;
        default: 
            throw new Error("bad enemy to generate (" + enemyToGenerate + ")")
    }
}

function getAllEnemiesLocations() {
    var toReturn = []
    for(var i = 0; i != Object.keys(allEnemiesGroups).length; i++) {
        for(var x = 0; x != allEnemiesGroups[Object.keys(allEnemiesGroups)[i]].length; x++) {
            toReturn.push(
                {
                    x: allEnemiesGroups[Object.keys(allEnemiesGroups)[i]][x].position.x,
                    y: allEnemiesGroups[Object.keys(allEnemiesGroups)[i]][x].position.y
                }
            )
        }
    }
    return toReturn
}

function regenerateHealth() {
    if(Math.abs(lastDamageFrame - frameCount) > 180 && health < 100) {
        health += 0.02
        health = Math.min(100, health)
    }
}



function updateEnemyHealth(enemy) {
    var bulletsToRemove = []
    var enemyKilled = false
    for(var i = 0; i != allAttackGroups.bullet.length; i++) {
        if(allAttackGroups.bullet[i].overlap(enemy)) {
            enemy.health -= spaceshipStatistics.bulletDamage
            bulletsToRemove.push(allAttackGroups.bullet[i])
            if(enemy.health <= 0) {
                enemyKilled = true
            }
        }
    }
    for(var i = 0; i != bulletsToRemove.length; i++) {
        bulletsToRemove[i].remove()
    }
    if(enemyKilled) {
        return "enemy killed";
    }

    var shieldsToRemove = []
    var enemyKilled = false
    for(var i = 0; i != allAttackGroups.shield.length; i++) {
        if(!allAttackGroups.shield[i].removed && allAttackGroups.shield[i].trueShield && allAttackGroups.shield[i].overlap(enemy)) {
            enemy.health -= spaceshipStatistics.bulletDamage
            shieldsToRemove.push(allAttackGroups.shield[i])
            if(enemy.health <= 0) {
                enemyKilled = true
            }
        }
    }
    for(var i = 0; i != shieldsToRemove.length; i++) {
        console.log(shieldsToRemove[i])
        shieldsToRemove[i].remove()
    }
    if(enemyKilled) {
        return "enemy killed";
    }
}