let starRating = 0;

const stars = document.querySelectorAll("svg");

const highlightStars = (starRating) => {
  for (let index = 0; index < 5; index++) {
    const star = stars[index];
    if (index < starRating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  }
};

for (let index = 0; index < 5; index++) {
  const star = stars[index];
  star.addEventListener("click", () => {
    starRating = index + 1;
    highlightStars(index + 1);
  });
}

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  if(starRating < 1) {
    return alert("Please add a rating.")
  }

  const text = document.querySelector("input").value;

  console.log({text, starRating})
})
