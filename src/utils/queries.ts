import { useEffect, useState } from "react";

// The output of `useQuery()` provides the result of the query or
// null if the query is still loading, failed, or returned no data.
// Also returns whether or not the query is loading.
export type QueryState<T> = {
  data: T | null;
  isLoading: boolean;
};

// A query is a function that returns a response of type `T`.
// Because the return type is a `Promise`, the query can be an
// asynchronous function.
type QueryFunction<T> = () => Promise<T>;
type QueryFunctionWithArgs<R, T> = (args: R) => Promise<T>;

// We can also provide optional callbacks to run when the query
// succeeds or fails.
type QueryOptions<T> = {
  onSuccess?: (data: T) => void;
  onFailure?: (error: Error) => void;
};

// React hook to allow UI components to query data asynchronously
// and access the results and loading state.
export function useQueryWithArgs<R, T>(
  queryFn: QueryFunctionWithArgs<R, T>,
  args: R,
  options?: QueryOptions<T>
): QueryState<T> {
  // State variables to track the query results and loading status.
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  // Effect hook to run the query and handle success or failure.
  useEffect(() => {
    queryFn(args)
      .then((result) => {
        // The query suceeded! Update the state with the result
        // and run the success callback, if any.
        setData(result);
        options?.onSuccess?.(result);
      })
      .catch((error) => {
        // The query failed. The result remains as null and we
        // run the failure callback, if any.
        options?.onFailure?.(error);
      })
      // Whether the request succeeded or failed, update to
      //  indicate that we are no longer loading.
      .finally(() => setIsLoading(false));
  }, [queryFn, options, args]);

  // Return the state variables so that components can use them
  // without having to worry about the internal query management.
  return { data, isLoading };
}

// Simplified hook for when queries do not require arguments.
export function useQuery<T>(
  queryFn: QueryFunction<T>,
  options?: QueryOptions<T>
): QueryState<T> {
  return useQueryWithArgs(queryFn, undefined, options);
}
