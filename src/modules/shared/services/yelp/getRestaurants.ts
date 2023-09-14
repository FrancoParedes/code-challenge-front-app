import axiosInstance from '@/modules/shared/functions/axiosInstance';
import { IRestaurant } from '@/modules/shared/interfaces/IRestaurant';
import { delay } from '@/modules/shared/functions/delay';

interface IGetRestaurantProps {
  pageNumber: number;
  category?: string | null;
}
export const getRestaurants = async ({
  pageNumber,
  category = null,
}: IGetRestaurantProps): Promise<IRestaurant[]> => {
  const itemsPerPage = 15;

  const offset = (pageNumber - 1) * itemsPerPage;
  const limit = itemsPerPage;

  const searchParams = new URLSearchParams();
  searchParams.append('location', 'San Jose, CA95127');
  searchParams.append('term', 'restaurants');
  searchParams.append('limit', String(limit));
  searchParams.append('offset', String(offset));
  if (category) {
    searchParams.append('categories', category);
  }
  const url = `https://api.yelp.com/v3/businesses/search?${searchParams.toString()}`;
  const { data } = await axiosInstance.get(url);
  const result = data.businesses as IRestaurant[];

  await delay(3000);//just for see the loading
  return result;
};
