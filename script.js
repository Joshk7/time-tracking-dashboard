const buttons = document.querySelectorAll(".buttons button");
const currentStats = document.querySelectorAll(".current");
const previousStats = document.querySelectorAll(".previous");

const populateDashboard = (data, time) => {
    for (let i = 0; i < data.length; i++) {
        const { current, previous } = data[i].timeframes[time];
        currentStats[i].textContent = `${current}hrs`;
        previousStats[i].textContent = `${previous}hrs`;
    }
};

let activeButton = document.querySelector(".active");

const handleClick = (event) => {
    activeButton.classList.remove("active");
    activeButton = event.target;
    event.target.classList.add("active");
    const time = event.target.dataset.time;

    fetch("/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch resource.");
            }
            return response.json();
        })
        .then((data) => {
            populateDashboard(data, time);
        })
        .catch((error) => {
            console.log(error);
        });
};

buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
});