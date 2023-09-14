import React from 'react';
import LoadingDots from '@/modules/shared/components/LoadingDots';
import RestaurantPageSkeleton from '@/modules/restaurants/components/RestaurantPageSkeleton';
import GalleryItem from '@/modules/restaurants/components/GalleryItem';
import FilterCategories from '@/modules/restaurants/components/FilterCategories';
import useRestaurantPageController from '@/modules/restaurants/RestaurantPageController';

interface IRestaurantPageProps {
  categorySelected: string;
}
const RestaurantsPage: React.FC<IRestaurantPageProps> = ({ categorySelected }) => {
  const {
    showGallery,
    showSkeleton,
    infinityScrollLoading,
    listRestaurants,
    listCategories,
    containerRef,
  } = useRestaurantPageController({ categorySelected });

  return (
    <div className="container">
      <FilterCategories
        categories={listCategories}
        loading={!listCategories.length}
        categorySelected={categorySelected}
      />

      <div className="gallery" ref={containerRef}>
        {showSkeleton && <RestaurantPageSkeleton />}
        {showGallery &&
          listRestaurants.map((restaurant) => (
            <GalleryItem key={restaurant.id} restaurant={restaurant} />
          ))}
      </div>
      {infinityScrollLoading && <LoadingDots />}
    </div>
  );
};

export default RestaurantsPage;
