import fetcher from "@/lib/fetcher";
import useSWR from "swr";
const useChatbot = () => {
  const { data, error, isLoading } = useSWR("/api/chatbot", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useChatbot;
