import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onLoading, onLoadingEnd } from '../store/common';

const useLoading = (isLoading?: boolean) => {
  const dispatch = useDispatch();

  const onDispatchLoading = () => dispatch(onLoading());
  const onDispatchLoadingEnd = () => dispatch(onLoadingEnd());

  useEffect(() => {
    if (typeof isLoading === 'boolean') {
      if (isLoading) {
        onDispatchLoading();
      } else {
        onDispatchLoadingEnd();
      }
    }
  }, [isLoading]);

  return {
    onLoading: onDispatchLoading,
    onLoadingEnd: onDispatchLoadingEnd,
  };
};

export default useLoading;
