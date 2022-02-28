var spaceshipStatistics
function drawEndless() {
    //Not Visuals
    manageSpaceshipMovement(spaceshipStatistics)
    manageBulletCreation()
    updateAllEnemies()

    //Visuals 
    drawGameBackground(camera.position.x, camera.position.y)
    drawBorders()
    drawSprites(allBullets)
    drawSprite(spaceshipSprite)
    drawAllEnemies()
    drawSpeedGUI()
    updateMapGui()
    drawMapGui()
}

function setupEndless() {
    spaceshipStatistics = getSpaceshipStatistics(spaceshipConfiguration.type, spaceshipConfiguration.power)
    setSpaceshipSpriteAnimation(spaceshipConfiguration.type, spaceshipConfiguration.power)
}

