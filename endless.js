var spaceshipStatistics
function drawEndless() {
    //Not Visuals
    manageSpaceshipMovement(spaceshipStatistics)

    //Visuals
    drawGameBackground(camera.position.x, camera.position.y)
    drawBorders()
    drawSprite(spaceshipSprite)
    drawSpeedGUI()
    updateMapGui()
    drawMapGui()
}

function setupEndless() {
    spaceshipStatistics = getSpaceshipStatistics(spaceshipConfiguration.type, spaceshipConfiguration.power)
    setSpaceshipSpriteAnimation(spaceshipConfiguration.type, spaceshipConfiguration.power)
}