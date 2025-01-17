const buttons = document.querySelectorAll(".buttons button");
const currentStats = document.querySelectorAll(".current");
const previousStats = document.querySelectorAll(".previous");

const populateDashboard = (data, time) => {
    for (let i = 0; i < data.length; i++) {
        const { current, previous } = data[i].timeframes[time];
        currentStats[i].textContent = `${current}hrs`;
        previousStats[i].textContent = `${previous}hrs`;
    }
}

let activeButton = document.querySelector(".active");

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        activeButton.classList.remove("active");
        activeButton = event.target;
        event.target.classList.add("active");
        const time = event.target.dataset.time;

        fetch("/data.json").then((response) => {
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
    });
});


const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseout", handleMouseOut);
});

function handleMouseMove(event) {
  const card = event.currentTarget;
  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const rotateX = (mouseY - cardCenterY) / 20;
  const rotateY = (mouseX - cardCenterX) / 20;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function handleMouseOut(event) {
  const card = event.currentTarget;
  card.style.transform = "";
}