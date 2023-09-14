import React from 'react';
import RestaurantPage from '@/modules/restaurants/RestaurantPage';
import { NextPageContext } from 'next';
import Head from 'next/head';

interface IIndexPageProps {
  category: string;
}

const IndexPage: React.FC<IIndexPageProps> = ({ category }) => {
  return<>
    <Head>
      <title>Restaurants | Challenge</title>
    </Head>
    <RestaurantPage categorySelected={category} />
  </>
};

export const getServerSideProps = (ctx: NextPageContext) => {
  const { category = null } = ctx.query;
  return {
    props: {
      category,
    },
  };
};
export default IndexPage;
