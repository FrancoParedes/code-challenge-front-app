import axiosInstance from '@/modules/shared/functions/axiosInstance';
import { IRestaurant } from '@/modules/shared/interfaces/IRestaurant';

interface IGetRestaurantProps {
  pageNumber: number;
  category?: string | null;
}
export const getRestaurants = async ({
  pageNumber,
  category = null,
}: IGetRestaurantProps): Promise<IRestaurant[]> => {
  const searchParams = new URLSearchParams();
  searchParams.append('pageNumber', String(pageNumber));
  if (category) {
    searchParams.append('category', category);
  }
  const url = `/api/yelp/restaurants?${searchParams.toString()}`;
  const { data } = await axiosInstance.get(url);
  return data;
};
