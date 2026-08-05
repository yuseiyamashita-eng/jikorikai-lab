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
    completeThreshold: 3
  },
  {
    storageKey: "work6",
    completeThreshold: 2
  },
  {
    storageKey: "work7",
    completeThreshold: 2
  },
  {
    storageKey: "work8",
    completeThreshold: 2
  },
  {
    storageKey: "work9",
    completeThreshold: 2
  },
  {
    storageKey: "work10",
    completeThreshold: 2
  }
];

// ======================
// 学習スケジュール設定
// ======================
const startDate = new Date(2026, 6, 23); // 年,月,日（月は0始まり）
const goalDays = 100;

const startDateText =
  `${startDate.getMonth() + 1}/${startDate.getDate()}`;

const goalDate = new Date(startDate);

goalDate.setDate(
    goalDate.getDate() + goalDays - 1
);

const goalDateText =
    `${goalDate.getMonth() + 1}/${goalDate.getDate()}`;

// ======================
// Chapterスケジュール設定
// ======================
const chapterSchedule = [
  {
    id: 1,
    name: "Chapter1",
    startDay: 1,
    endDay: 14
  },
  {
    id: 2,
    name: "Chapter2",
    startDay: 15,
    endDay: 30
  },
  {
    id: 3,
    name: "Chapter3",
    startDay: 31,
    endDay: 51
  },
  {
    id: 4,
    name: "Chapter4",
    startDay: 52,
    endDay: 70
  },
  {
    id: 5,
    name: "Chapter5",
    startDay: 71,
    endDay: 80
  },
  {
    id: 6,
    name: "Chapter6",
    startDay: 81,
    endDay: 100
  }
];

// ======================
// Chapterスケジュール関数
// ======================
function getChapterDateRange(chapter) {

  const start = new Date(startDate);
  start.setDate(start.getDate() + chapter.startDay - 1);

  const end = new Date(startDate);
  end.setDate(end.getDate() + chapter.endDay - 1);

  return {
    start,
    end
  };
}

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
const chapter1VideoProgress =
  document.getElementById("chapter1-video-progress");

const chapter1WorkProgress =
  document.getElementById("chapter1-work-progress");

const chapter1VideoCount =
  document.getElementById("chapter1VideoCount");

const chapter1WorkCount =
  document.getElementById("chapter1WorkCount");

const studyDay =
  document.getElementById("studyDay");

const scheduleProgressBar =
  document.getElementById("scheduleProgress");

const scheduleMarker =
  document.getElementById("scheduleMarker");

const startDateLabel =
  document.getElementById("startDateLabel");

const goalDateLabel =
  document.getElementById("goalDateLabel");

const today = new Date();

const elapsedDays =
  Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

const currentDay = Math.min(
  Math.max(elapsedDays, 1),
  goalDays
);

const scheduleProgress =
  ((currentDay - 1) / (goalDays - 1)) * 100;

if (studyDay) {
    studyDay.textContent = `📅 今日は ${currentDay}日目 です`;
}

if (startDateLabel) {
    startDateLabel.textContent = startDateText;
}

if (goalDateLabel) {
    goalDateLabel.textContent = goalDateText;
}

const todayDate = document.getElementById("todayDate");

if (todayDate) {

    const weekNames = ["日", "月", "火", "水", "木", "金", "土"];

    todayDate.textContent =
      `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日（${weekNames[today.getDay()]}）`;

}

if (scheduleProgressBar) {
    scheduleProgressBar.style.width =
      scheduleProgress + "%";
}

if (scheduleMarker) {
    scheduleMarker.style.left = `${scheduleProgress}%`;
}

if (chapter1VideoProgress) {

    let completedCount = 0;

    for (let i = 0; i < chapter1Videos.length; i++) {

        if (localStorage.getItem(chapter1Videos[i]) === "true") {
            completedCount++;
        }

    }

    const progress = (completedCount / chapter1Videos.length) * 100;

    chapter1VideoProgress.style.width = progress + "%";

    chapter1VideoCount.textContent =
    `${completedCount} / ${chapter1Videos.length}`;

}

if (chapter1WorkProgress) {

    let completedWorkCount = 0;

    for (let i = 0; i < chapter1Works.length; i++) {

        const workData = JSON.parse(
            localStorage.getItem(chapter1Works[i].storageKey)
        );

        if (!workData) continue;

        const completedCount =
            Object.values(workData.completed).filter(Boolean).length;

        if (completedCount >= chapter1Works[i].completeThreshold) {
            completedWorkCount++;
        }

    }

    const workProgress =
        (completedWorkCount / chapter1Works.length) * 100;

    chapter1WorkProgress.style.width = workProgress + "%";

    chapter1WorkCount.textContent =
    `${completedWorkCount} / ${chapter1Works.length}`;

}

// ======================
// Chapter学習期間表示
// ======================
chapterSchedule.forEach((chapter) => {

  const range = getChapterDateRange(chapter);

  const period = document.getElementById(
    `chapter${chapter.id}Period`
  );

  if (period) {
    period.textContent =
      `${range.start.getMonth() + 1}/${range.start.getDate()}〜${range.end.getMonth() + 1}/${range.end.getDate()}`;
  }
  
});

// ======================
// 現在のChapterを強調表示
// ======================
chapterSchedule.forEach((chapter) => {

    if (
        currentDay >= chapter.startDay &&
        currentDay <= chapter.endDay
    ) {

        const chapterCard =
            document.getElementById(`chapter${chapter.id}`);

        if (chapterCard) {
            chapterCard.classList.add("active-chapter");
        }

    }

});

// ======================
// ワークページ（自動保存）
// ======================
if (
  document.querySelector("textarea") ||
  document.querySelector('input[type="radio"]')
) {

const answerSelector =
  "textarea, input[type='text'], input[type='radio'], input[type='checkbox'], select";

const answerInputs = document.querySelectorAll(answerSelector);

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

function saveAnswer(data, input) {

  if (input.type === "radio") {

    if (input.checked) {
      data.answers[input.name] = input.value;
    }

  } else if (input.type === "checkbox") {

    data.answers[input.id] = input.checked;

  } else {

    data.answers[input.id] = input.value;

  }

}

function restoreAnswer(savedData, input) {

  if (!savedData.answers) return;

  if (input.type === "radio") {

    if (savedData.answers[input.name] === input.value) {
      input.checked = true;
    }

  } else if (input.type === "checkbox") {

    if (savedData.answers[input.id] !== undefined) {
      input.checked = savedData.answers[input.id];
    }

  } else {

    if (savedData.answers[input.id] !== undefined) {
      input.value = savedData.answers[input.id];
    }

  }

}

function hasAnsweredQuestion(question) {

  const inputs = question.querySelectorAll(answerSelector);

  return [...inputs].some((input) => {

    if (input.type === "radio") {
      return input.checked;
    }

    if (input.type === "checkbox") {
      return input.checked;
    }

    return input.value.trim() !== "";

  });

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

answerInputs.forEach((input) => {

  const eventType =
    input.type === "radio" ? "change" : "input";

  input.addEventListener(eventType, () => {

    const data = JSON.parse(localStorage.getItem(storageKey)) || {
      answers: {},
      completed: {}
    };

    // 入力された項目だけ保存
    saveAnswer(data, input);

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
  answerInputs.forEach((input) => {

  restoreAnswer(savedData, input);

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

    const body = card.querySelector(".question-body");
    const header = card.querySelector(".question-header");

    const hasAnswer = hasAnsweredQuestion(card);

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