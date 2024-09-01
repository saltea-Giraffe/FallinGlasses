const glasses = document.getElementById("glasses");
const character = document.getElementById("character");
const startButton = document.getElementById("startButton");
let falling = false;  // 初期状態では落下しない
let glassesSpeed = 3;  // 速度を調整
let characterInitialPosX = parseInt(character.style.left) || 200;  // キャラクターの初期位置を適切に設定

// スタート（リセット）ボタンを押したときの処理
startButton.addEventListener("click", () => {
    resetGame();  // ゲームをリセット
    falling = true;  // 落下を開始する
});

// キーボード入力の処理
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        falling = false;  // スペースキーで落下停止
    }
    if (event.code === "ArrowLeft") {
        characterInitialPosX -= 15;  // 移動量を調整
        if (characterInitialPosX < 0) characterInitialPosX = 0;
        character.style.left = characterInitialPosX + "px";
    }
    if (event.code === "ArrowRight") {
        characterInitialPosX += 15;  // 移動量を調整
        if (characterInitialPosX > 400) characterInitialPosX = 400;  // キャラクターの右端位置を調整
        character.style.left = characterInitialPosX + "px";
    }
});

// ゲームのリセット処理
function resetGame() {
    // 眼鏡の位置をリセット
    glasses.style.top = "0px";
    glasses.style.left = "55%"; // 初期位置を再設定

    // キャラクターの位置をリセット
    characterInitialPosX = 200;  // 初期位置に戻す
    character.style.left = "50%";  // 中央に配置

    falling = false;  // 落下を停止しておく
}

// ゲームの更新ループ
function update() {
    if (falling) {
        let glassesTop = parseInt(glasses.style.top || 0);
        glassesTop += glassesSpeed;
        if (glassesTop + 20 >= 800) { // 眼鏡が下端に到達したら停止（高さ800pxに対応）
            falling = false;
        }
        glasses.style.top = glassesTop + "px";
    }
    requestAnimationFrame(update);
}

update();
