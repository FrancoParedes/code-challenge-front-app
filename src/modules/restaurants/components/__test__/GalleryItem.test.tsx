import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GalleryItem from '@/modules/restaurants/components/GalleryItem';

const mockRestaurant = {
  id: '1',
  image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/cz4PKevCEGTlutQZm6i2BQ/o.jpg',
  alias: 'restaurant-alias',
  name: 'Restaurant Name',
  rating: 4.5,
  price: '$$',
  url: 'https://example.com/restaurant',
};

window.open = jest.fn();

describe('test Gallery item', () => {
  it('render with complete data', () => {
    render(<GalleryItem restaurant={mockRestaurant} />);

    const image = screen.getByAltText(mockRestaurant.alias);
    expect(image).toBeInTheDocument();

    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.price)).toBeInTheDocument();

    expect(screen.getByText('VIEW')).toBeInTheDocument();
  });

  it('render incomplete data', () => {
    const { container } = render(<GalleryItem restaurant={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('click item', () => {
    render(<GalleryItem restaurant={mockRestaurant} />);
    const buttonItem = screen.getByText('VIEW');
    fireEvent.click(buttonItem);
    expect(window.open).toHaveBeenCalledWith(mockRestaurant.url, '_blank');
  });

  it('render loading', () => {
    const { container } = render(<GalleryItem restaurant={null} loading />);
    expect(container).toMatchSnapshot();
  });
});
