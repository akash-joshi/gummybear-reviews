let rating = 0;

const stars = document.querySelectorAll("svg");

type RatingObject = {
  rating: number;
  reviewText: string;
};

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
    rating = index + 1;
    highlightStars(index + 1);
  });

  star.addEventListener("mouseenter", () => {
    for (let starIndex = 0; starIndex < stars.length; starIndex++) {
      if (starIndex <= index) {
        stars[starIndex].classList.add("hover");
      } else {
        stars[starIndex].classList.remove("hover");
      }
    }
  });
}

document.querySelector(".rating-stars").addEventListener("mouseleave", () => {
  for (const star of stars) {
    star.classList.remove("hover");
  }
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (rating < 1) {
    return alert("Please add a rating.");
  }

  const reviewText = document.querySelector("input").value;

  if (!reviewText.trim()) {
    return alert("Please add review text.");
  }

  const postData: RatingObject = {
    rating,
    reviewText,
  };

  await fetch("http://localhost:3001/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .catch(console.error);

  location.href = "/";
});
