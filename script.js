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