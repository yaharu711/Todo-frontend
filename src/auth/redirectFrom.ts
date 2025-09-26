import { DEFAULT_AFTER_LOGIN } from "../routes/paths";

export type FromParts = {
  pathname?: string;
  search?: string;
  hash?: string;
};

const buildUrl = (
  { pathname, search, hash }: FromParts,
  fallback = DEFAULT_AFTER_LOGIN
) => {
  const p = pathname && pathname.length > 0 ? pathname : fallback;
  const s = search || "";
  const h = hash || "";
  return `${p}${s}${h}`;
};

export const resolveAuthRedirectTarget = (args?: {
  stateFrom?: FromParts;
  defaultPath?: string;
}): string => {
  const fallback = args?.defaultPath || DEFAULT_AFTER_LOGIN;

  const stateFrom = args?.stateFrom;
  if (stateFrom && (stateFrom.pathname || stateFrom.hash || stateFrom.search)) {
    return buildUrl(stateFrom, fallback);
  }
  return fallback;
};

// React Router に依存する処理をここへ集約
import { useLocation } from "react-router-dom";

export const useAuthRedirect = (opts?: { defaultPath?: string }) => {
  const defaultPath = opts?.defaultPath ?? DEFAULT_AFTER_LOGIN;
  const location = useLocation();
  const stateFrom = ((location.state as { from?: FromParts } | null) || {})?.from;
  const target = resolveAuthRedirectTarget({ stateFrom, defaultPath });

  const buildNavigateState = (): { from: FromParts } => ({
    from: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
  });

  return { target, buildNavigateState };
};
