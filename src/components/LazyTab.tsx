import { type ReactNode, useState } from 'react';

type LazyTabProps = {
  active: boolean;
  children: ReactNode;
};

const LazyTab = ({ active, children }: LazyTabProps) => {
  const [hasBeenActivated, setHasBeenActivated] = useState(false);

  if (active && !hasBeenActivated) {
    setHasBeenActivated(true);
  }

  return hasBeenActivated ? children : null;
};

export default LazyTab;
