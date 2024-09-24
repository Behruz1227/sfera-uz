import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface UseGetResponse<T> {
  loading: boolean;
  error: any;
  data: any;
  getData: () => void; // Ma'lumotlarni olish imkonini beradi
}

export function useGet<T>(url: string, config?: any): UseGetResponse<T> {
  const queryClient = useQueryClient();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const getData = async () => {
    setLoading(true);
    setError(null); // Avvalgi xatolikni tozalash
    try {
      const result = await axios.get(url, config ? config : {});
      if (result.data.error) {
        setData([])
        throw new Error(result.data.error);
      }
      setData(result.data.data); // Ma'lumotlarni set qilish
    } catch (err) {
      setError(err); // Xatolikni set qilish
      setData([])
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    getData, // Bu funksiya ishlaganda ma'lumotlarni olish uchun API chaqiriladi
  };
}
