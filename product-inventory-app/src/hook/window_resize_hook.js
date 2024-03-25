import { useEffect, useState } from 'react';

function useScreenWidthLessThan768() {
  const [isLessThan768, setIsLessThan768] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLessThan768(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect only runs once after initial render

  return isLessThan768;
}

export default useScreenWidthLessThan768;


