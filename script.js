// ======================
// Chapter1 データ
// ======================

// ======================
// 定数
// ======================
const chapter1Videos = [
    "chapter1-video1",
    "chapter1-video2",
    "chapter1-video3",
    "chapter1-video4",
    "chapter1-video5"
];

// ワーク設定
const chapter1Works = [
  {
    storageKey: "work1",
    completeThreshold: 3
  },
  {
    storageKey: "work2",
    completeThreshold: 3
  },
  {
    storageKey: "work3",
    completeThreshold: 3
  },
  {
    storageKey: "work4",
    completeThreshold: 3
  },
  {
    storageKey: "work5",
    completeThreshold: 2
  }
];

// ======================
// 動画ページ
// ======================
const button = document.getElementById("completeBtn");

if (button && document.body.dataset.chapter) {

    const chapterNumber = document.body.dataset.chapter;
    const videoNumber = document.body.dataset.video;
    const videoStorageKey = `chapter${chapterNumber}-video${videoNumber}`;

    let completed = localStorage.getItem(videoStorageKey) === "true";

    if (completed) {
        button.textContent = "☑ 視聴済み";
        button.classList.add("completed");
    } else {
        button.textContent = "☐ 視聴済みにする";
        button.classList.remove("completed");
    }

    button.addEventListener("click", function () {

        completed = !completed;

        localStorage.setItem(videoStorageKey, completed);

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
// 共通関数
// ======================

// ======================
// ステータス表示更新
// ======================
function updateStatus(status, isCompleted) {

    status.classList.remove(
        "status-completed",
        "status-incomplete"
    );

    if (isCompleted) {
        status.textContent = "☑";
        status.classList.add("status-completed");
    } else {
        status.textContent = "☐";
        status.classList.add("status-incomplete");
    }

}

// ======================
// 動画一覧ページ
// ======================
if (document.getElementById("video1Status")) {

    for (let i = 0; i < chapter1Videos.length; i++) {

        const status = document.getElementById(`video${i + 1}Status`);

        if (!status) continue;

        updateStatus(
            status,
            localStorage.getItem(chapter1Videos[i]) === "true"
        );
    }

  }

// ======================
// ワーク一覧ページ
// ======================
if (document.getElementById("work1Status")) {

    for (let i = 0; i < chapter1Works.length; i++) {

        const status = document.getElementById(`work${i + 1}Status`);

        if (!status) continue;

        const workData = JSON.parse(
            localStorage.getItem(chapter1Works[i].storageKey)
        );

        if (!workData) {
            status.textContent = "☐";
            continue;
        }

const completedCount =
    Object.values(workData.completed).filter(Boolean).length;

updateStatus(
    status,
    completedCount >= chapter1Works[i].completeThreshold
);

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

// ======================
// ワークページ（自動保存）
// ======================
if (document.querySelector("textarea")) {

const textareas = document.querySelectorAll("textarea");
const completeButtons = document.querySelectorAll(".answerCompleteBtn");

const questionHeaders = document.querySelectorAll(".question-header");
const questionBodies = document.querySelectorAll(".question-body");

const storageKey = window.location.pathname.split("/").pop().replace(".html", "");

function updateProgress() {

  const data = JSON.parse(localStorage.getItem(storageKey)) || {
    answers: {},
    completed: {}
  };

  let answeredCount = 0;

  completeButtons.forEach((button) => {

    const questionId = button.dataset.question;

    if (data.completed[questionId]) {
      answeredCount++;
    }

  });

  const totalQuestions = document.querySelectorAll(".question-card").length;

  document.getElementById("progressText").textContent =
  `${answeredCount} / ${totalQuestions}問回答済み`;

}

completeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const data = JSON.parse(localStorage.getItem(storageKey)) || {
      answers: {},
      completed: {}
    };

    const questionId = button.dataset.question;

    data.completed[questionId] = !data.completed[questionId];

    // ボタン表示を切り替え
    if (data.completed[questionId]) {
      button.textContent = "☑";
      button.classList.add("completed");
    } else {
      button.textContent = "☐";
      button.classList.remove("completed");
    }

    localStorage.setItem(storageKey, JSON.stringify(data));

    updateProgress();

  });

});

textareas.forEach((textarea) => {

  textarea.addEventListener("input", () => {

    const data = JSON.parse(localStorage.getItem(storageKey)) || {
      answers: {},
      completed: {}
    };

    // 入力された項目だけ保存
    data.answers[textarea.id] = textarea.value;

    localStorage.setItem(storageKey, JSON.stringify(data));

    updateProgress();

  });

});

// ======================
// ワークページ（自動復元）
// ======================
const savedData = JSON.parse(localStorage.getItem(storageKey));

if (savedData) {

  // 回答を復元
  textareas.forEach((textarea) => {
    
    if (
      savedData.answers &&
      savedData.answers[textarea.id] !== undefined
    ) {
      textarea.value = savedData.answers[textarea.id];
    }

  });

  // ★回答済みボタンを復元
  completeButtons.forEach((button) => {

  const questionId = button.dataset.question;

  if (
    savedData.completed &&
    savedData.completed[questionId]
  ) {
    button.textContent = "☑";
    button.classList.add("completed");
  }

});

}

// ======================
// 入力済みカードを自動で開く
// ======================

const questionCards = document.querySelectorAll(".question-card");

questionCards.forEach((card) => {

    const textareas = card.querySelectorAll("textarea");
    const body = card.querySelector(".question-body");
    const header = card.querySelector(".question-header");

    const hasAnswer = [...textareas].some(textarea =>
        textarea.value.trim() !== ""
    );

    if (hasAnswer) {
        body.classList.add("open");
        header.classList.add("open");
    }

});

updateProgress();

questionHeaders.forEach((header) => {

    header.addEventListener("click", (event) => {

        if (event.target.closest(".answerCompleteBtn")) {
            return;
        }

        const card = header.closest(".question-card");
        const body = card.querySelector(".question-body");

        body.classList.toggle("open");
        header.classList.toggle("open");

    });

});

}