import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick';
import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import { IRestaurantCategory } from '@/modules/shared/interfaces/IRestaurant';
import { DEVICES } from '@/modules/shared/constants/devices';

interface IFilterCategoriesProps {
  categories: IRestaurantCategory[];
  loading: boolean;
  categorySelected: string;
}
const FilterCategories: React.FC<IFilterCategoriesProps> = ({
  categories,
  loading,
  categorySelected,
}) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const router = useRouter();

  const handleClick = (categoryId: string) => () =>
    !isSwiping &&
    router.push({
      pathname: '/',
      query: {
        category: categoryId,
      },
    });

  const swipingStart = () => setIsSwiping(true);

  const swipingEnd = () => setIsSwiping(false);

  const isActive = (category: IRestaurantCategory) =>
    categorySelected === category.alias ? 'active' : '';

  return (
    <Slider
      afterChange={swipingEnd}
      onSwipe={swipingStart}
      className="slider"
      slidesToShow={3}
      slidesToScroll={3}
      speed={500}
      arrows={false}
      infinite={false}
      responsive={[
        {
          breakpoint: DEVICES.TABLET - 1,
          settings: { slidesToShow: 2, slidesToScroll: 2 },
        },
      ]}
    >
      {loading && (
        <Skeleton
          className="slider-item"
          width="90%"
          height={40}
        />
      )}
      {loading && (
        <Skeleton
          className="slider-item"
          width="90%"
          height={40}
        />
      )}
      {loading && (
        <Skeleton
          className="slider-item"
          width="90%"
          height={40}
        />
      )}

      {!!categories.length &&
        categories.map((category) => (
          <div key={category.alias}>
            <div className="slider-item">
              <button
                type="button"
                className={`${isActive(category)} `}
                onClick={handleClick(category.alias)}
              >
                {category.title}
              </button>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default FilterCategories;
