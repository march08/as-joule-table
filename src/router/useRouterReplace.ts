import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParamsWithReplace = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const replace = (name: string, value: string) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set(name, value);
    router.replace(`${pathname}?${nextSearchParams.toString()}`);
  };

  return {
    searchParams,
    replace,
  };
};
