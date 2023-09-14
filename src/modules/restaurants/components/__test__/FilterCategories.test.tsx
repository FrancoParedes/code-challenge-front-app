import '@testing-library/jest-dom/';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterCategories from '@/modules/restaurants/components/FilterCategories';
import { NextRouter } from 'next/router';

const mockCategories = [
  { alias: 'category1', title: 'Category 1' },
  { alias: 'category2', title: 'Category 2' },
  { alias: 'category3', title: 'Category 3' },
];

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

describe('FilterCategories', () => {
  it('make click in category2', () => {
    render(
      <FilterCategories
        categories={mockCategories}
        loading={false}
        categorySelected="category1"
      />
    );

    const categoryToClick = screen.getByText('Category 2');
    fireEvent.click(categoryToClick);

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/',
      query: {
        category: 'category2',
      },
    });
  });
});
