import { useState } from "react";
import StarRatings from "./StarRatings";

type RatingObject = {
  rating: number;
  reviewText: string;
};

export default function AddRevew() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating < 1) {
      return alert("Please add a rating.");
    }

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

    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>What’s your rating?</h1>

      <form onSubmit={onSubmit}>
        <div>Rating</div>
        <div>
          <StarRatings
            selectable
            rating={rating}
            onChange={(rating) => setRating(rating)}
            className="rating-stars"
          />
        </div>

        <div>
          <label htmlFor="review-text">Review</label>
        </div>

        <div>
          <input
            id="review-text"
            type="text"
            placeholder="Start typing..."
            required
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
}
