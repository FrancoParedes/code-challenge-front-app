import type { NextApiRequest, NextApiResponse } from 'next';
import { queryServer } from '@/modules/shared/functions/queryServer';
import { APIService } from '@/modules/shared/services/APIService';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { pageNumber, category } = req.query;

  const { data } = await queryServer(() =>
    APIService.yelp.getRestaurants({
      pageNumber: Number(pageNumber),
      category: category && String(category) || null,
    })
  );
  res.status(200).json(data);
}
