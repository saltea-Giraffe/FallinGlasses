const glasses = document.getElementById("glasses");
const character = document.getElementById("character");
const startButton = document.getElementById("startButton");
let falling = false;  // 初期状態では落下しない
let glassesSpeed = 2;
let characterPosX = 125;  // キャラクターの初期位置（中央）

// スタートボタンを押したときの処理
startButton.addEventListener("click", () => {
    falling = true;  // 落下を開始する
    startButton.style.display = "none";  // スタートボタンを非表示にする
});

// キーボード入力の処理
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        falling = false;  // スペースキーで落下停止
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

// ゲームの更新ループ
function update() {
    if (falling) {
        let glassesTop = parseInt(glasses.style.top || 0);
        glassesTop += glassesSpeed;
        if (glassesTop + 20 >= 500) { // 眼鏡が下端に到達したら停止
            falling = false;
        }
        glasses.style.top = glassesTop + "px";
    }
    requestAnimationFrame(update);
}

update();
