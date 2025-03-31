"use client";

import axiosInstance from "@/lib/api/axios";
import { getQueryClient } from "@/lib/provider/QueryProvider";
import styled from "@emotion/styled";
import {
  dehydrate,
  HydrationBoundary,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Card = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f0f8ff;
  border-radius: 8px;
`;

const TodoList = styled.ul`
  margin-top: 1rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Example API call for client-side refetching if needed
const fetchTodos = async () => {
  const response = await axiosInstance.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
};

// Client-side wrapper component that handles React Query
export default function PrefetchedClient() {
  // Create a client
  const queryClient = getQueryClient();

  // Prefetch on mount
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["todos"],
      queryFn: fetchTodos,
    });
  }, [queryClient]);

  // Create a dehydrated state
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <QueryClientProvider client={queryClient}>
        <TodosDisplay />
      </QueryClientProvider>
    </HydrationBoundary>
  );
}

// Component that displays the todos
function TodosDisplay() {
  // The data is already prefetched and available in the cache
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <Container>
      <Title>Prefetched Data with TanStack Query</Title>

      <Card>
        <h2>Client-side Prefetched Todos</h2>
        <p>This data was prefetched on the client and hydrated.</p>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading data</p>}
        {todos && (
          <TodoList>
            {todos.map(
              (todo: { id: number; title: string; completed: boolean }) => (
                <li key={todo.id}>
                  {todo.title} - {todo.completed ? "Completed" : "Pending"}
                </li>
              )
            )}
          </TodoList>
        )}

        <BackLink href="/">Back to Home</BackLink>
      </Card>
    </Container>
  );
}
