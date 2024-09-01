const glasses = document.getElementById("glasses");
const character = document.getElementById("character");
const startButton = document.getElementById("startButton");
let falling = false;  // 初期状態では落下しない
let glassesSpeed = 3;  // 速度を調整
let characterPosX = character.offsetLeft;  // キャラクターの初期位置を正しく取得

// スタート（リセット）ボタンを押したときの処理
startButton.addEventListener("click", () => {
    resetGame();  // ゲームをリセット
    falling = true;  // 落下を開始する
});

// キーボード入力の処理
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (falling) {
            falling = false;  // スペースキーで落下停止
        }
    }
    if (event.code === "ArrowLeft") {
        characterPosX -= 15;  // 左への移動量を調整
        if (characterPosX < 50) characterPosX = 50;  // 左端を50pxに設定して少し右にずらす
        character.style.left = characterPosX + "px";
    }
    if (event.code === "ArrowRight") {
        characterPosX += 15;  // 右への移動量を調整
        if (characterPosX > (document.getElementById("gameArea").offsetWidth - character.offsetWidth + 150)) {
            characterPosX = document.getElementById("gameArea").offsetWidth - character.offsetWidth + 150;  // 右端を150px増やして可動域を右にずらす
        }
        character.style.left = characterPosX + "px";
    }
});

// ゲームのリセット処理
function resetGame() {
    // 眼鏡の位置をリセット
    glasses.style.top = "0px";
    glasses.style.left = "50%"; // 初期位置を中央に設定

    // キャラクターの位置をリセット
    characterPosX = (document.getElementById("gameArea").offsetWidth - character.offsetWidth) / 2 + 100;  // 初期位置を中央に設定
    character.style.left = characterPosX + "px";

    falling = true;  // 落下を開始できるように設定
}

// ゲームの更新ループ
function update() {
    if (falling) {
        let glassesTop = parseInt(glasses.style.top || 0);
        glassesTop += glassesSpeed;
        if (glassesTop + glasses.offsetHeight >= 900) { // 眼鏡が900pxで停止
            glassesTop = 900 - glasses.offsetHeight;
            falling = false;
        }
        glasses.style.top = glassesTop + "px";
    }
    requestAnimationFrame(update);
}

update();
