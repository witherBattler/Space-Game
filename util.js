function mouseOverRect(x, y, width, height, type = "center") {
    switch(type) {
        case "center":
        if(mouseX > x - width / 2 && mouseX < x + width / 2 && mouseY > y - height / 2 && mouseY < y + height / 2) {
            return true
        }
        break;
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