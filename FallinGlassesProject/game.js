const glasses = document.getElementById("glasses");
const character = document.getElementById("character");
let falling = true;
let glassesSpeed = 2;
let characterPosX = 125;  // Initial position of the character (centered)

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        falling = false;
    }
    if (event.code === "ArrowLeft") {
        characterPosX -= 10;
        if (characterPosX < 0) characterPosX = 0;
        character.style.left = characterPosX + "px";
    }
    if (event.code === "ArrowRight") {
        characterPosX += 10;
        if (characterPosX > 200) characterPosX = 200;
        character.style.left = characterPosX + "px";
    }
});

function update() {
    if (falling) {
        let glassesTop = parseInt(glasses.style.top || 0);
        glassesTop += glassesSpeed;
        if (glassesTop + 20 >= 500) { // Check if glasses reach the bottom
            falling = false;
        }
        glasses.style.top = glassesTop + "px";
    }
    requestAnimationFrame(update);
}

update();
