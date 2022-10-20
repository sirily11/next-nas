import { useRouter } from "next/router";

/**
 * Helper function for getting the current folder.
 */
export function useParent() {
  const router = useRouter();
  const { folder } = router.query;
  return folder as string | undefined;
}
