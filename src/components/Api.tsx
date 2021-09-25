import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect, SetStateAction } from "react";
import { ArenaPosts } from "../Interface/IPost";
const arenaPosts: ArenaPosts[] = [];
export const useAxios = (axiosParams: {
  method: any;
  url: string;
  headers: any;
  data?: any;
}) => {
  const [response, setResponse] = useState<ArenaPosts[]>(arenaPosts);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(axiosParams.url);
    fetchData(axiosParams);
  }, [axiosParams.url]);

  return { response, error, loading };
};
