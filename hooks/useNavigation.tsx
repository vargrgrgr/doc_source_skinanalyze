import {
  NavigationProp,
  useNavigation as useNavigationNative,
} from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const useNavigateLock = () => {
  const [isLocked, setIsLocked] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLocked(false);
    }, []),
  );

  const locker = () => {
    if (isLocked) {
      return false;
    } else {
      setIsLocked(true);
      return true;
    }
  };

  return locker;
};

export default function useNavigation<
  T = NavigationProp<ReactNavigation.RootParamList>,
>({ lock }: { lock?: boolean } = {}) {
  const navigationLock = useNavigateLock();
  const navigation = useNavigationNative<T>();

  if (!lock) {
    return navigation;
  }

  return {
    ...navigation,
    push: function <RouteName extends keyof ReactNavigation.RootParamList>(
      ...args: undefined extends ReactNavigation.RootParamList[RouteName]
        ?
            | [screen: RouteName]
            | [
                screen: RouteName,
                params: ReactNavigation.RootParamList[RouteName],
              ]
        : [screen: RouteName, params: ReactNavigation.RootParamList[RouteName]]
    ) {
      if (navigationLock()) {
        (navigation as any).push(...args);
      }
    },
  };
}
