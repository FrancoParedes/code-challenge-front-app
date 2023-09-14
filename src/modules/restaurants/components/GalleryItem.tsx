import Image from 'next/image';
import Rating from '@/modules/shared/components/Rating';
import React from 'react';
import { IRestaurant } from '@/modules/shared/interfaces/IRestaurant';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type IPartialRestaurant = Pick<
  IRestaurant,
  'url' | 'alias' | 'id' | 'name' | 'rating' | 'price' | 'url' | 'image_url'
>;

interface IGalleryItemProps {
  restaurant: IPartialRestaurant | null;
  loading?: boolean;
}

const validateFullData = (restaurant: IPartialRestaurant) => {
  const { id, image_url, alias, name, rating, url } = restaurant;
  return !!(id && image_url && alias && name && rating && url);
};

const GalleryItem: React.FC<IGalleryItemProps> = ({ restaurant, loading = false }) => {
  const hasAllInformation = restaurant && validateFullData(restaurant);
  if (!hasAllInformation && !loading) {
    return null;
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(restaurant?.url, '_blank');
  };

  return (
    <div className={`gallery-item ${!loading ? 'border' : ''}`} onClick={handleOnClick}>
      <div className="gallery-item-image">
        {!loading && restaurant && (
          <Image
            src={restaurant?.image_url}
            alt={restaurant?.alias}
            width="105"
            height="105"
          />
        )}
        {loading && <Skeleton width={105} height={105} />}
      </div>
      <div className="gallery-item-body">
        <div className="gallery-item-title">
          {restaurant?.name || <Skeleton width="100%" />}
        </div>
        <div className="gallery-item-footer">
          <div>
            {restaurant?.rating ? (
              <Rating rating={restaurant.rating} />
            ) : (
              <Skeleton width={80} />
            )}
          </div>
          {restaurant?.price && <div>{restaurant.price}</div>}
          {loading && <Skeleton width={50} />}
        </div>
        <div className="gallery-item-button">
          {restaurant && (
            <button type="button" onClick={handleOnClick}>
              VIEW
            </button>
          )}
          {!restaurant && <Skeleton width={100} height={30} />}
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
