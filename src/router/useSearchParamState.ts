"use client";
import { useSearchParamsWithReplace } from "@/router/useRouterReplace";
import React from "react";

import { useCookies } from "next-client-cookies";

type SearchParamStateValue = string | undefined;

export const useSearchParamState = (
  key: string,
  defaultValue?: SearchParamStateValue,
): [SearchParamStateValue, (value: string) => void] => {
  const { searchParams, replace } = useSearchParamsWithReplace();

  const cookies = useCookies();

  const searchParamValue = searchParams.get(key);

  const [state, setState] = React.useState<SearchParamStateValue>(
    searchParamValue || cookies.get(key) || defaultValue,
  );

  return [
    state,
    (value: string) => {
      replace(key, value);
      setState(value);
      cookies.set(key, value);
    },
  ];
};
