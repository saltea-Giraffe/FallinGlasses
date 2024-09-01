const glasses = document.getElementById("glasses");
const character = document.getElementById("character");
const startButton = document.getElementById("startButton");
const result = document.getElementById("result");
let falling = false;  // 初期状態では落下しない
let glassesSpeed = 3;  // 速度を調整
let characterPosX = character.offsetLeft;  // キャラクターの初期位置を正しく取得

// スタート（リセット）ボタンを押したときの処理
startButton.addEventListener("click", () => {
    resetGame();  // ゲームをリセット
    falling = true;  // 落下を開始する
});

// キーボード入力の処理
document.addEventListener("keydown", async (event) => {
    if (event.code === "Space") {
        if (falling) {
            falling = false;  // スペースキーで落下停止
            await calculateAccuracy();  // 一致度を計算する
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
    glasses.style.top = "0px";
    glasses.style.left = "50%";
    characterPosX = (document.getElementById("gameArea").offsetWidth - character.offsetWidth) / 2 + 100;
    character.style.left = characterPosX + "px";
    falling = true;
}

// ゲームの更新ループ
function update() {
    if (falling) {
        let glassesTop = parseInt(glasses.style.top || 0);
        glassesTop += glassesSpeed;
        if (glassesTop + glasses.offsetHeight >= 900) {
            glassesTop = 900 - glasses.offsetHeight;
            falling = false;
        }
        glasses.style.top = glassesTop + "px";
    }
    requestAnimationFrame(update);
}

update();

// 一致度を計算する
async function calculateAccuracy() {
    const glassesRect = glasses.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = document.getElementById("gameArea").offsetWidth;
    canvas.height = document.getElementById("gameArea").offsetHeight;

    ctx.drawImage(character, characterRect.left, characterRect.top);
    ctx.drawImage(glasses, glassesRect.left, glassesRect.top);

    const currentImageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

    const formData = new FormData();
    formData.append('current_image', currentImageBlob);
    formData.append('answer_image', new Blob([await fetch('/static/images/answer_character_with_glasses.png').then(r => r.blob())], { type: 'image/png' }));

    const response = await fetch('/compare', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    document.getElementById('result').innerText = `一致度: ${result.accuracy.toFixed(2)}%`;
}
