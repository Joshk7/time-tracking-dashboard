const buttons = document.querySelectorAll(".buttons button");
let activeButton = document.querySelector(".active");

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        activeButton.classList.remove("active");
        activeButton = event.target;
        event.target.classList.add("active");
    });
});