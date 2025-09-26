export type FromParts = {
  pathname?: string;
  search?: string;
  hash?: string;
};

export const AUTH_FROM_KEY = "auth:from" as const;

const buildUrl = (
  { pathname, search, hash }: FromParts,
  fallback = "/todos"
) => {
  const p = pathname && pathname.length > 0 ? pathname : fallback;
  const s = search || "";
  const h = hash || "";
  return `${p}${s}${h}`;
};

export const saveAuthFrom = (from: FromParts) => {
  try {
    const payload: FromParts = {
      pathname: from.pathname || "/todos",
      search: from.search || "",
      hash: from.hash || "",
    };
    sessionStorage.setItem(AUTH_FROM_KEY, JSON.stringify(payload));
  } catch {
    // no-op
  }
};

export const peekSavedAuthFrom = (): FromParts | null => {
  try {
    const saved = sessionStorage.getItem(AUTH_FROM_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved) as FromParts;
    return {
      pathname: parsed?.pathname || "/todos",
      search: parsed?.search || "",
      hash: parsed?.hash || "",
    };
  } catch {
    return null;
  }
};

export const clearAuthFrom = () => {
  try {
    sessionStorage.removeItem(AUTH_FROM_KEY);
  } catch {
    // no-op
  }
};

export const resolveAuthRedirectTarget = (args?: {
  stateFrom?: FromParts;
  defaultPath?: string;
}): string => {
  const fallback = args?.defaultPath || "/todos";

  const stateFrom = args?.stateFrom;
  if (stateFrom && (stateFrom.pathname || stateFrom.hash || stateFrom.search)) {
    return buildUrl(stateFrom, fallback);
  }

  // const saved = peekSavedAuthFrom();
  // if (saved) return buildUrl(saved, fallback);

  return fallback;
};
