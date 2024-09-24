import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toastMessage } from "../api/toastMessage";


interface UsePostResponse<T> {
  loading: boolean;
  error: any;
  response: any;
  postData: () => void;
}

export function usePost<T>(url: string, data: any, config?: any): UsePostResponse<T> {
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axios.post(url, data, config ? config : {});
      if (result.data.error) {
        throw new Error(result.data.error.message);
      }
      return result.data.data;
    },
    onError: (error: any) => {
      // Custom error handling if needed
    },
  });

  return {
    loading: mutation.status === "pending", // status 'pending' indicates loading
    error: mutation.error,
    response: mutation.data,
    postData: mutation.mutateAsync,
  };
}
