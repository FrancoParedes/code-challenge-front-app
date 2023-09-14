import {
  IRestaurant,
  IRestaurantCategory,
} from '@/modules/shared/interfaces/IRestaurant';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from 'react-query';
import { APIService } from '@/modules/shared/services/APIService';
import useWindowSize from '@/modules/shared/hooks/useWindowSize';

interface IRestaurantsPageControllerProps {
  categorySelected: string;
}
const useRestaurantPageController = ({
  categorySelected,
}: IRestaurantsPageControllerProps) => {
  const [filterCategory, setFilterCategory] = useState(categorySelected);

  const [listRestaurants, setListRestaurants] = useState<IRestaurant[]>([]);
  const [listCategories, setListCategories] = useState<IRestaurantCategory[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [stopFetching, setStopFetching] = useState(false);

  const { width, isTablet } = useWindowSize();

  const incrementPageNumberAndStop = () => {
    setStopFetching((current) => {
      if (!current) {
        setPageNumber((currentPage) => currentPage + 1);
      }
      return true;
    });
  };

  const fetchMoreData = async () => {
    const container = containerRef.current;
    const items = container?.querySelectorAll('.gallery-item');
    const startLoading = isTablet ? 3 : 7;

    const itemNumberStart = items?.[items.length - startLoading];

    if (!container || !itemNumberStart) {
      return;
    }
    const rect = itemNumberStart.getBoundingClientRect();
    const isItemReached = rect.bottom <= window.innerHeight;

    return isItemReached && incrementPageNumberAndStop();
  };

  const handleScroll = async () => !stopFetching && fetchMoreData();

  const createCategoryList = (restaurants: IRestaurant[]) => {
    const categories = restaurants.reduce(
      (allCategories: IRestaurantCategory[], restaurant) => {
        restaurant.categories.forEach((category) => {
          if (!allCategories.find((item) => item.alias === category.alias)) {
            allCategories.push(category);
          }
        });
        return allCategories;
      },
      []
    );
    setListCategories(categories);
  };

  const firstRequest = useQuery(
    ['GET_RESTAURANTS'],
    () =>
      APIService.restaurants.getRestaurants({
        pageNumber: 1,
        category: categorySelected,
      }),
    {
      onSuccess: (data) => {
        setStopFetching(false);
        setPageNumber(1);
        setListRestaurants(data);

        return !listCategories.length && createCategoryList(data);
      },
    }
  );

  const mutation = useMutation({
    mutationFn: () =>
      APIService.restaurants.getRestaurants({ pageNumber, category: categorySelected }),
    onSuccess: (data) => {
      if (!data.length) {
        setStopFetching(true);
        return;
      }
      setStopFetching(false);
      setListRestaurants((current) => [...current, ...data]);
    },
  });

  const showSkeleton = firstRequest.isFetching;
  const showGallery = !showSkeleton && !!listRestaurants.length;

  const loadFirstPageAgain = () => {
    firstRequest.refetch();
    setFilterCategory(categorySelected);
  };

  const checkIfCategoryChanged = () => {
    const isDifferentCategory = categorySelected !== filterCategory;
    return isDifferentCategory && loadFirstPageAgain();
  };

  const moreFetching = () => {
    if (pageNumber > 1) {
      mutation.mutate();
    }
  };

  const createListener = () => !!width && window.addEventListener('scroll', handleScroll);

  useEffect(() => {
    moreFetching();
  }, [pageNumber]);

  useEffect(() => {
    createListener();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [width]);

  useEffect(() => {
    checkIfCategoryChanged();
  }, [categorySelected]);

  return {
    listRestaurants,
    listCategories,
    showGallery,
    showSkeleton,
    infinityScrollLoading: mutation.isLoading,
    containerRef,
  };
};

export default useRestaurantPageController;
