console.log("hello world");

const initAverageRating = (avgRating) => {
  document.querySelector(".main-content").classList.remove("display-none");
  document.querySelector(".loading").classList.add("display-none");
};

initAverageRating(3.8);

// fill #FDCE71