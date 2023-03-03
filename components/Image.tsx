import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

const Image = (props: FastImageProps) => {
  return <FastImage resizeMode={FastImage.resizeMode.cover} {...props} />;
};

export default Image;
