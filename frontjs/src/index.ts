console.log("hello world");

const initAverageRating = (avgRating) => {
  const starRating = Math.ceil(avgRating);

  document.querySelector(".avg-rating").innerHTML = avgRating;
  document.querySelector(".avg-rating-stars").setAttribute("title", avgRating);

  const stars = document.querySelectorAll(".avg-rating-stars svg");

  for (let index = 0; index < starRating; index++) {
    const star = stars[index];

    star.classList.add("active");
  }

  document.querySelector(".main-content").classList.remove("display-none");
  document.querySelector(".loading").classList.add("display-none");
};

initAverageRating(2.8);

// fill #FDCE71
