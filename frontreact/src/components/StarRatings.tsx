import { useState } from "react";
import Star, { StarStates } from "./Star";

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
  const initialStarHoverState: StarStates[] = [
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ];

  const [starHover, setStarHover] = useState<StarStates[]>(
    initialStarHoverState
  );

  return (
    <span
      className={`stars ${className ? className : ``}`}
      title={rating?.toFixed(1)}
      onMouseLeave={() => setStarHover(initialStarHoverState)}
    >
      {[0, 1, 2, 3, 4].map((num) => {
        let starState: StarStates = "empty";

        if (rating) {
          if (
            num < rating &&
            num + 1 > rating &&
            rating - Math.floor(rating) < 0.75 &&
            rating - Math.floor(rating) > 0.25
          ) {
            starState = "half";
          } else {
            if (num < Math.round(rating)) {
              starState = "full";
            }
          }
        }

        return (
          <Star
            onMouseMove={(e) => {
              if (selectable) {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                const x = e.clientX - rect.left;

                setStarHover(
                  starHover.map((_, index) => {
                    if (index === num && x < 16) {
                      return "half";
                    }
                    if (index <= num) {
                      return "full";
                    }
                    return "empty";
                  })
                );
              }
            }}
            key={num}
            state={starState}
            onClick={(e) => {
              if (onChange) {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                const x = e.clientX - rect.left;

                onChange(num + (x < 16 ? 0.5 : 1));
              }
            }}
            className={`${starState} ${
              starHover[num] === "full"
                ? " hover"
                : starHover[num] === "half"
                ? " hover-left"
                : ""
            }`}
          />
        );
      })}
    </span>
  );
}
