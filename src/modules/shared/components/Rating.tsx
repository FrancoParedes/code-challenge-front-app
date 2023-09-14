import React from 'react';
interface IRatingProps {
  rating: number;
}
const Rating: React.FC<IRatingProps> = ({ rating }) => {
  const MAX_STARS = 5;
  const starArray = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    if (i <= rating) {
      starArray.push(
        <img
          key={i}
          src="/assets/images/star-filled.png"
          width="15px"
          alt={String(rating)}
        />
      );
    } else if (i - 0.5 <= rating) {
      starArray.push(
        <img
          key={i}
          src="/assets/images/star-half.png"
          width="15px"
          alt={String(rating)}
        />
      );
    } else {
      starArray.push(
        <img
          key={i}
          src="/assets/images/star-empty.png"
          width="15px"
          alt={String(rating)}
        />
      );
    }
  }

  return <div className="rating">{starArray}</div>;
};

export default Rating;
