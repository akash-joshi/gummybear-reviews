import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

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
      "http://159.89.4.76:3001/data"
    ).then((response) => response.json());

    if (ratings.length > 0) {
      setRatings(ratings);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (ratings.length > 0) {
      setAverageRating(
        ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length
      );
    }
  }, [ratings]);

  useEffect(() => {
    const socket = io("http://159.89.4.76:3001");

    socket.on("new rating", (msg) => {
      setRatings((ratings) => [msg, ...ratings]);
    });

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
                  rating={averageRating}
                  className="avg-rating-stars"
                />
              </div>

              <Link to="/addreview">
                <button>Add Review</button>
              </Link>
            </div>

            <div className="divider" />

            {ratings.length > 0 && (
              <div className="ratings-list-container">
                <h2>Reviews</h2>

                <div className="star-rating-list">
                  {ratings.map(({ rating, reviewText }, index) => (
                    <div key={index} className="star-rating-row">
                      <StarRatings rating={rating} className={"rating-stars"} />

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
