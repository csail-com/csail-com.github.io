"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { RecoilState, useResetRecoilState } from "recoil";

/**
 * Custom hook to reset Recoil states when navigating away from the current page
 * @param atoms Array of Recoil atom states to reset
 * @returns void
 */
export const useRecoilReset = <T,>(atoms: RecoilState<T>[]) => {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(pathname);

  // Individually call useResetRecoilState for each atom
  // This avoids the React Hook error about calling hooks inside a callback
  const resetFunctions = atoms.map(useResetRecoilState);

  useEffect(() => {
    // Only run when pathname changes
    if (prevPathname.current !== pathname) {
      // Reset all atoms when pathname changes
      resetFunctions.forEach((resetFunction) => resetFunction());
      // Update the previous pathname
      prevPathname.current = pathname;
    }
  }, [pathname, resetFunctions]);
};

export default useRecoilReset;
