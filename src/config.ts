const TEXT_TO_COLOR_ENDPOINTS = {
  default: "/v1/text-to-color/",
  mock: "/v1/text-to-color/mock",
} as const;

const MOCK_PAGE_PATHNAMES = [
  "/mock",
  "/mock.html",
  "/mock/index.html",
] as const;

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/+$/, "");

const normalizePathname = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

const getEndpointPath = (pathname: string) =>
  MOCK_PAGE_PATHNAMES.some(
    (mockPagePathname) => mockPagePathname === normalizePathname(pathname),
  )
    ? TEXT_TO_COLOR_ENDPOINTS.mock
    : TEXT_TO_COLOR_ENDPOINTS.default;

export const createTextToColorEndpoint = (
  baseUrl: string,
  pathname: string,
) => `${normalizeBaseUrl(baseUrl)}${getEndpointPath(pathname)}`;
