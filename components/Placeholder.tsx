import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import colors from '../utils/colors';

interface SkeletonPlaceholderProps {
  children: JSX.Element | JSX.Element[];
  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

const Placeholder = (props: SkeletonPlaceholderProps) => {
  return (
    <SkeletonPlaceholder
      speed={1500}
      backgroundColor={colors.disabled}
      highlightColor={colors.disabled}
      {...props}
    />
  );
};

export default Placeholder;
