import React, { useCallback, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Camera, PhotoFile } from 'react-native-vision-camera';

import colors from '../utils/colors';

interface Props {
  camera: React.RefObject<Camera>;
  onPhotoCaptured: (photo: PhotoFile) => void;
}

const CameraButton = ({ camera, onPhotoCaptured }: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [pictureTaken, setPictureTaken] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setPictureTaken(false);
    }, []),
  );

  const takePhoto = async () => {
    try {
      if (!camera.current) {
        return;
      }

      setPictureTaken(true);
      const photo = await camera.current.takePhoto();
      onPhotoCaptured(photo);
    } catch (e) {
      setPictureTaken(false);
      console.error('Failed to take photo!', e);
    }
  };

  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={styles.cameraButton}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={takePhoto}
      disabled={pictureTaken}
    >
      <View style={styles.border}>
        <Animated.View
          style={[styles.innerButton, { transform: [{ scale: scaleAnim }] }]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cameraButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#deddbb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: colors.background,
  },
});

export default CameraButton;
