const finishButton = document.getElementById("finishButton");
const messageArea = document.getElementById("messageArea");

finishButton.addEventListener("click", function () {
    messageArea.innerHTML = `
        <h2>🎉 お疲れさまでした！</h2>
        <p>第1章の学習が完了しました。</p>
        <button>○○の質問へ進む</button>
    `;
});