const TEXT_TO_COLOR_ENDPOINTS = {
  default: "/v1/text-to-color/",
  mock: "/v1/text-to-color/mock",
} as const;

const normalizePathname = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

export const getTextToColorEndpoint = (pathname: string) =>
  normalizePathname(pathname) === "/mock"
    ? TEXT_TO_COLOR_ENDPOINTS.mock
    : TEXT_TO_COLOR_ENDPOINTS.default;
