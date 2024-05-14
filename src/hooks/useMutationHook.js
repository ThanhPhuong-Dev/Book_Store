import { useMutation } from 'react-query';

export const useMutationHook = (fnCallBack) => {
  const mutation = useMutation((data) => {
    return fnCallBack(data);
  });
  return mutation;
};
