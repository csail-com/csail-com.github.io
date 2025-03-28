"use client";

import {
  useRouter as useNextRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useMemo } from "react";

export function useRouter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useNextRouter();

  // Convert searchParams to query object like in Pages router
  const query = useMemo(() => {
    const queryObj: Record<string, string | string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      if (queryObj[key]) {
        // If key already exists, make it an array
        if (Array.isArray(queryObj[key])) {
          (queryObj[key] as string[]).push(value);
        } else {
          queryObj[key] = [queryObj[key] as string, value];
        }
      } else {
        queryObj[key] = value;
      }
    }
    return queryObj;
  }, [searchParams]);

  // Convert params to object
  const routeParams = useMemo(() => {
    return params || {};
  }, [params]);

  // Construct asPath (current URL path including query string)
  const asPath = useMemo(() => {
    const queryString = searchParams.toString();
    return pathname + (queryString ? `?${queryString}` : "");
  }, [pathname, searchParams]);

  // Get the route pattern (similar to Pages router route)
  const route = useMemo(() => {
    // This is an approximation as App Router doesn't expose route patterns
    // We simply return the pathname as the closest equivalent
    return pathname;
  }, [pathname]);

  // Combine everything into a Pages router-like interface
  return {
    pathname,
    query,
    asPath,
    route,
    params: routeParams,
    isReady: true, // Always true in App Router
    // Add methods from the new router
    push: router.push,
    replace: router.replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  };
}

export default useRouter;
