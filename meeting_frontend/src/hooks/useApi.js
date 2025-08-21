import { useState, useCallback } from "react";

export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFunc(...args);
        setData(res);
        return res;
      } catch (err) {
        setError(err.message || "發生錯誤");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, loading, error, request, setData };
}
