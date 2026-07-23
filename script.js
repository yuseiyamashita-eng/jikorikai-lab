const button = document.getElementById("completeBtn");

let completed = localStorage.getItem("video1") === "true";

if (completed) {
    button.textContent = "☑ 視聴済み";
    button.classList.add("completed");
} else {
    button.textContent = "☐ 視聴済みにする";
    button.classList.remove("completed");
}

button.addEventListener("click", function () {

    completed = !completed;

    localStorage.setItem("video1", completed);

    if (completed) {
        button.textContent = "☑ 視聴済み";
        button.classList.add("completed");
    } else {
        button.textContent = "☐ 視聴済みにする";
        button.classList.remove("completed");
    }

});