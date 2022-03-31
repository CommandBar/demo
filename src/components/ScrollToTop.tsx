import { ReactElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }: { children: ReactElement }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

export default ScrollToTop;
