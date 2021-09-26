import { useEffect, useState } from "react";
import StarRatings from "./StarRatings";

type RatingObject = {
  rating: number;
  reviewText: string;
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratings, setRatings] = useState<Array<RatingObject>>([]);

  const fetchRatings = async () => {
    const ratings: Array<RatingObject> = await fetch(
      "http://localhost:3001/data"
    ).then((response) => response.json());

    if (ratings.length > 0) {
      setAverageRating(
        ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length
      );
      setRatings(ratings);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div>
      <div className="container">
        <h1>The Minimalist Entrepreneur</h1>

        {loading ? (
          <div className="loading">Loading ...</div>
        ) : (
          <div className="main-content">
            <div className="avg-ratings-line">
              <div>
                <span className="avg-rating">{averageRating.toFixed(1)}</span>
                <StarRatings
                  rating={Math.round(averageRating)}
                  className="avg-rating-stars"
                />
              </div>

              <a href="/addreview">Add Review</a>
            </div>

            <div className="divider" />

            {ratings.length > 0 && (
              <div className="ratings-list-container">
                <h2>Reviews</h2>

                <div className="star-rating-list">
                  {ratings.map(({ rating, reviewText }, index) => (
                    <div key={index} className="star-rating-row">
                      <StarRatings
                        rating={Math.round(rating)}
                        className={"rating-stars"}
                      />

                      <b>{rating}</b>
                      <span className="review-text">, {reviewText}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
