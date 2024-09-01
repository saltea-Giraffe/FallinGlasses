const glasses = document.getElementById("glasses");
const character = document.getElementById("character");
const startButton = document.getElementById("startButton");
let falling = false;  // 初期状態では落下しない
let glassesSpeed = 3;  // 速度を調整
let characterPosX = 200;  // キャラクターの初期位置（中央）

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
        characterPosX -= 15;  // 移動量を調整
        if (characterPosX < 0) characterPosX = 0;
        character.style.left = characterPosX + "px";
    }
    if (event.code === "ArrowRight") {
        characterPosX += 15;  // 移動量を調整
        if (characterPosX > 400) characterPosX = 400;  // キャラクターの右端位置を調整
        character.style.left = characterPosX + "px";
    }
});

// ゲームのリセット処理
function resetGame() {
    // 眼鏡の位置をリセット
    glasses.style.top = "0px";
    glasses.style.left = "55%"; // 初期位置を再設定

    // キャラクターの位置をリセット
    characterPosX = 200;  // 初期位置に戻す
    character.style.left = "50%";  // 中央に配置

    falling = true;  // 落下を開始できるように設定
}

// ゲームの更新ループ
function update() {
    if (falling) {
        let glassesTop = parseInt(glasses.style.top || 0);
        glassesTop += glassesSpeed;
        if (glassesTop + glasses.offsetHeight >= 800) { // 眼鏡が下端に到達したら停止
            glassesTop = 800 - glasses.offsetHeight;  // 画面下端に位置を固定
            falling = false;
        }
        glasses.style.top = glassesTop + "px";
    }
    requestAnimationFrame(update);
}

update();
