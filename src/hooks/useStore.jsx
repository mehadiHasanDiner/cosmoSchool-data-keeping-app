import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useStore = () => {
  const { mirpurBranch, loading } = useAuth();

  const { refetch, data: storeItems = [] } = useQuery({
    queryKey: ["store", mirpurBranch],
    enabled: !loading,

    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/store/${mirpurBranch}`
      );
      return res.json();
    },
  });
  return [refetch, storeItems];
};

export default useStore;
