import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toastMessage } from '../api/toastMessage';

interface UseEditOptions<T> {
  url: string;
  data: T;
}

interface UseEditResponse<T> {
  loading: boolean;
  error: any;
  response: any;
  editData: () => void;
}

export function useEdit<T>(url: string, data: any, config?: any): UseEditResponse<T> {
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axios.put(url, data, config ? config : {}); 
      if (result.data.error) {
        throw new Error(result.data.error);
      }
      return result.data.data;
    },
    onError: () => {
    },
  });

  return {
    loading: mutation.status === 'pending', // status 'pending' indicates loading
    error: mutation.error,
    response: mutation.data,
    editData: mutation.mutateAsync,
  };
}
