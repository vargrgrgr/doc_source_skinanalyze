import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Toast } from '../utils/utils';

const useToastErrors = (
  methods: UseFormReturn<any>,
  { bottomOffset = 40 }: { bottomOffset?: number } = { bottomOffset: 40 },
) => {
  useEffect(() => {
    if (methods.formState.isSubmitting) {
      const { errors } = methods.formState;
      if (Object.keys(errors).length) {
        Toast.show({
          text1: errors[Object.keys(errors)[0]].message as string,
          bottomOffset,
        });
      }
    }
  }, [methods.formState.isSubmitting]);
};

export default useToastErrors;
