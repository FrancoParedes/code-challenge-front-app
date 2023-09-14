import { useEffect, useState } from 'react';
import { DEVICES } from '@/modules/shared/constants/devices';

const useWindowSize = () => {
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    setWidth(currentWidth);
  };

  const isTablet = width >= DEVICES.TABLET;

  const setListenerResize = () => window.addEventListener('resize', handleResize);

  const cleanListener = () => window.removeEventListener('resize', handleResize);

  useEffect(() => {
    handleResize();
    setListenerResize();
    return cleanListener;
  }, []);

  return {
    width,
    isTablet,
  };
};

export default useWindowSize;
