var spaceshipStatistics
function drawEndless() {
    //Not Visuals
    manageSpaceshipMovement(spaceshipStatistics)
    manageBulletCreation()
    updateAllAttacks()
    updateAllEnemies()
    randomlyGenerateEnemies()
    regenerateHealth()

    //Visuals 
    drawGameBackground(camera.position.x, camera.position.y)
    drawBorders()
    drawAllAttacks()
    drawSprite(spaceshipSprite)
    drawAllEnemies()
    drawSpeedGUI()
    drawHealthGUI()
    updateMapGui()
    drawMapGui()
}

function setupEndless() {
    spaceshipStatistics = getSpaceshipStatistics(spaceshipConfiguration.type, spaceshipConfiguration.power)
    setSpaceshipSpriteAnimation(spaceshipConfiguration.type, spaceshipConfiguration.power)
}

