import getStarRatingRow from "./getStarRatingRow";

const initAverageRating = (avgRating) => {
  if (avgRating === 0) {
    document.querySelector(".avg-rating").classList.add("medium-text");
    document.querySelector(".avg-rating").innerHTML = "No Reviews Added Yet.";
    document.querySelector(".avg-rating-stars").classList.add("display-none");
  } else {
    const starRating = Math.round(avgRating);

    document.querySelector(".avg-rating").innerHTML = avgRating;
    document
      .querySelector(".avg-rating-stars")
      .setAttribute("title", avgRating);

    const stars = document.querySelectorAll(".avg-rating-stars svg");

    for (let index = 0; index < starRating; index++) {
      const star = stars[index];

      star.classList.add("active");
    }
  }

  document.querySelector(".main-content").classList.remove("display-none");
  document.querySelector(".loading").classList.add("display-none");
};

const main = async () => {
  const ratings = await fetch("http://159.89.4.76/data").then((response) =>
    response.json()
  );

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length
        ).toFixed(1)
      : 0;

  const ratingsList = ratings
    .map(({ rating, reviewText }) => getStarRatingRow(rating, reviewText))
    .join("");

  initAverageRating(averageRating);
  if (ratings.length > 0) {
    document.querySelector(".star-rating-list").innerHTML = ratingsList;
    document
      .querySelector(".ratings-list-container")
      .classList.remove("display-none");
  }
};

main();
