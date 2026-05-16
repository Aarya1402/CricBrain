import { useState, useEffect } from 'react';
import { matchApi } from '../api';
import mockData from '../data/mockMatch.json';

export const useMatchData = () => {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshData = async () => {
    try {
      const response = await matchApi.getMatchData();
      setData(response.data);
    } catch (err) {
      console.error("Error fetching match data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { data, loading, error, refreshData };
};
