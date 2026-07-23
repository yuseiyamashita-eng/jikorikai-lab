const button = document.getElementById("completeBtn");

let completed = false;

button.addEventListener("click", function () {

    completed = !completed;

    if (completed) {
        button.textContent = "☑ 視聴済み";
        button.classList.add("completed");
    } else {
        button.textContent = "☐ 視聴済みにする";
        button.classList.remove("completed");
    }

});