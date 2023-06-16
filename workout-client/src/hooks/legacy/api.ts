import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1/";

const useFetch = (params: AxiosRequestConfig<any>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.request(params);
      setData(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios Error: ${error.message}`);
      } else {
        setError(error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, error, loading] as const;
};

export { useFetch };
