import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BackHandler } from 'react-native';
import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetModalProps>(
  (props, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      ...bottomSheetModalRef.current!,
      dismiss: () => {
        setIsOpen(false);
        bottomSheetModalRef.current?.dismiss();
      },
      present: () => {
        setIsOpen(true);
        bottomSheetModalRef.current?.present();
      },
    }));

    const useCustomBackHandler = useCallback(() => {
      const backAction = () => {
        if (isOpen) {
          setIsOpen(false);
          bottomSheetModalRef.current?.dismiss();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        backHandler.remove();
      };
    }, [isOpen]);

    useFocusEffect(useCustomBackHandler);

    return <BottomSheetModal ref={bottomSheetModalRef} {...props} />;
  },
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
