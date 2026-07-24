// ======================
// 第1章の動画一覧
// ======================
const chapter1Videos = [
    "chapter1-video1",
    "chapter1-video2",
    "chapter1-video3",
    "chapter1-video4",
    "chapter1-video5"
];
const chapter1Works = [
    "chapter1-work1",
    "chapter1-work2",
    "chapter1-work3"
];

// ======================
// 動画ページ
// ======================
const button = document.getElementById("completeBtn");

if (button && document.body.dataset.chapter) {

    const chapterNumber = document.body.dataset.chapter;
    const videoNumber = document.body.dataset.video;
    const storageKey = `chapter${chapterNumber}-video${videoNumber}`;

    let completed = localStorage.getItem(storageKey) === "true";

    if (completed) {
        button.textContent = "☑ 視聴済み";
        button.classList.add("completed");
    } else {
        button.textContent = "☐ 視聴済みにする";
        button.classList.remove("completed");
    }

    button.addEventListener("click", function () {

        completed = !completed;

        localStorage.setItem(storageKey, completed);

        if (completed) {
            button.textContent = "☑ 視聴済み";
            button.classList.add("completed");
        } else {
            button.textContent = "☐ 視聴済みにする";
            button.classList.remove("completed");
        }

    });

}

// ======================
// 動画一覧ページ
// ======================
if (document.getElementById("video1Status")) {

    for (let i = 0; i < chapter1Videos.length; i++) {

        const status = document.getElementById(`video${i + 1}Status`);

        if (!status) continue;

        if (localStorage.getItem(chapter1Videos[i]) === "true") {
            status.textContent = "☑";
        } else {
            status.textContent = "☐";
        }

    }

}

if (document.getElementById("work1Status")) {

    for (let i = 0; i < chapter1Works.length; i++) {

        const status = document.getElementById(`work${i + 1}Status`);

        if (!status) continue;

        if (localStorage.getItem(chapter1Works[i]) === "true") {
            status.textContent = "☑";
        } else {
            status.textContent = "☐";
        }

    }

}

// ======================
// ホーム画面
// ======================
const progressBar = document.getElementById("chapter1Progress");

if (progressBar) {

    let completedCount = 0;

    for (let i = 0; i < chapter1Videos.length; i++) {

        if (localStorage.getItem(chapter1Videos[i]) === "true") {
            completedCount++;
        }

    }

    const progress = (completedCount / chapter1Videos.length) * 100;

    progressBar.style.width = progress + "%";

}

if (document.body.dataset.work === "1") {

    const completeBtn = document.getElementById("completeBtn");

    if (completeBtn) {

        if (localStorage.getItem("chapter1-work1") === "true") {
            completeBtn.textContent = "☑ 回答済み";
            completeBtn.classList.add("completed");
        }

        completeBtn.addEventListener("click", function () {

            const completed = localStorage.getItem("chapter1-work1") === "true";

            if (completed) {
                localStorage.setItem("chapter1-work1", "false");
                completeBtn.textContent = "☐ 回答済みにする";
                completeBtn.classList.remove("completed");
            } else {
                localStorage.setItem("chapter1-work1", "true");
                completeBtn.textContent = "☑ 回答済み";
                completeBtn.classList.add("completed");
    }

});

    }

}