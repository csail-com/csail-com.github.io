import axiosInstance from "@/lib/api/axios";
import { getQueryClient } from "@/lib/tanstackQuery/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PrefetchedClient from "./client";

// Server-side prefetching
async function fetchTodos() {
  try {
    const response = await axiosInstance.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export default async function PrefetchedPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PrefetchedClient />
    </HydrationBoundary>
  );
}
