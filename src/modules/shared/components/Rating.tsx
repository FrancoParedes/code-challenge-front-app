import React from 'react';
import Image from 'next/image';
interface IRatingProps {
  rating: number;
}
const Rating: React.FC<IRatingProps> = ({ rating }) => {
  const MAX_STARS = 5;
  const starArray = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    if (i <= rating) {
      starArray.push(
        <Image
          key={i}
          src="/assets/images/star-filled.png"
          alt="rating"
          width={15}
          height={15}
        />
      );
    } else if (i - 0.5 <= rating) {
      starArray.push(
        <Image
          key={i}
          src="/assets/images/star-half.png"
          alt="rating"
          width={15}
          height={15}
        />
      );
    } else {
      starArray.push(
        <Image
          key={i}
          src="/assets/images/star-empty.png"
          alt="rating"
          width={15}
          height={15}
        />
      );
    }
  }

  return <div className="rating">{starArray}</div>;
};

export default Rating;
