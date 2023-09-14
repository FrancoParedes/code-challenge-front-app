import { meServices } from './me';
import { getRestaurants } from '@/modules/shared/services/yelp/getRestaurants';
import { restaurantsServices } from '@/modules/shared/services/restaurants';

export const APIService = {
  me: meServices,
  yelp: {
    getRestaurants,
  },
  restaurants: restaurantsServices,
};
