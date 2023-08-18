import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything, just handles scrolling
}

export default ScrollToTopOnRouteChange;
