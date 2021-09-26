let rating = 0;

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
    rating = index + 1;
    highlightStars(index + 1);
  });

  star.addEventListener("mouseenter", () => {
    for (let starIndex = 0; starIndex <= index; starIndex++) {
      stars[starIndex].classList.add("hover");
    }
  });

  star.addEventListener("mouseleave", () => {
    star.classList.remove("hover");
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

  type PostData = {
    rating: number;
    reviewText: string;
  };

  const postData: PostData = {
    rating,
    reviewText,
  };

  await fetch("http://localhost:3000/data", {
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
