import { useState } from "react";
import Star from "./Star";

interface StarRatingsProps {
  className?: string;
  rating?: number;
  selectable?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRatings({
  className,
  rating,
  onChange,
  selectable,
}: StarRatingsProps) {
  const initialStarHoverState = [false, false, false, false, false];

  const [starHover, setStarHover] = useState(initialStarHoverState);

  return (
    <span
      className={`stars ${className ? className : ``}`}
      title={rating?.toFixed(1)}
      onMouseLeave={() => setStarHover(initialStarHoverState)}
    >
      {[0, 1, 2, 3, 4].map((num) => (
        <Star
          onMouseEnter={() => {
            if (selectable) {
              setStarHover(
                starHover.map((_, index) => {
                  if (index <= num) {
                    return true;
                  }
                  return false;
                })
              );
            }
          }}
          key={num}
          onClick={() => {
            if (onChange) {
              onChange(num + 1);
            }
          }}
          className={`${rating && num < rating ? "active" : ""} ${
            starHover[num] ? " hover" : ""
          }`}
        />
      ))}
    </span>
  );
}
