var spaceshipStatistics
function drawEndless() {
    //Not Visuals
    manageSpaceshipMovement(spaceshipStatistics)
    manageBulletCreation()

    //Visuals
    background("red")
    drawGameBackground(camera.position.x, camera.position.y)
    drawSprites(allBullets)
    drawSprite(spaceshipSprite)
    drawSpeedGUI()
    updateMapGui()
    drawMapGui()
}

function setupEndless() {
    spaceshipStatistics = getSpaceshipStatistics(spaceshipConfiguration.type, spaceshipConfiguration.power)
    setSpaceshipSpriteAnimation(spaceshipConfiguration.type, spaceshipConfiguration.power)
}

