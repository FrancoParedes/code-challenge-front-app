import GalleryItem from '@/modules/restaurants/components/GalleryItem';

const RestaurantPageSkeleton = () => (
  <>
    <GalleryItem restaurant={null} loading />
    <GalleryItem restaurant={null} loading />
    <GalleryItem restaurant={null} loading />
    <GalleryItem restaurant={null} loading />
    <GalleryItem restaurant={null} loading />
  </>
);

export default RestaurantPageSkeleton;
