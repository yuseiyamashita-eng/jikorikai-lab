const chapter1Videos = [
    "chapter1-video1",
    "chapter1-video2",
    "chapter1-video3",
    "chapter1-video4",
    "chapter1-video5"
];
const button = document.getElementById("completeBtn");

if (button) {

    let completed = localStorage.getItem("chapter1-video1") === "true";

    if (completed) {
        button.textContent = "☑ 視聴済み";
        button.classList.add("completed");
    } else {
        button.textContent = "☐ 視聴済みにする";
        button.classList.remove("completed");
    }

    button.addEventListener("click", function () {

        completed = !completed;

        localStorage.setItem("chapter1-video1", completed);

        if (completed) {
            button.textContent = "☑ 視聴済み";
            button.classList.add("completed");
        } else {
            button.textContent = "☐ 視聴済みにする";
            button.classList.remove("completed");
        }

    });

}
const status = document.getElementById("video1Status");

if (status) {
    const completed = localStorage.getItem("chapter1-video1") === "true";

    if (completed) {
        status.textContent = "☑";
    } else {
        status.textContent = "☐";
    }
}
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
