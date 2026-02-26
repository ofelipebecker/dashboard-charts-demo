import { useState } from 'react';

const LazyTab = ({ active, children }) => {
  const [hasBeenActivated, setHasBeenActivated] = useState(false);

  if (active && !hasBeenActivated) {
    setHasBeenActivated(true);
  }

  return hasBeenActivated ? children : null;
};

export default LazyTab;
