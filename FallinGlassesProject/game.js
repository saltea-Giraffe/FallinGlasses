const glasses = document.getElementById("glasses");
const character = document.getElementById("character");
const startButton = document.getElementById("startButton");
let falling = false;  // 初期状態では落下しない
let glassesSpeed = 3;  // 速度を調整
let characterPosX = 200;  // キャラクターの初期位置（中央）

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
