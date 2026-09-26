import { createColorResult } from "./color";

const createRequestOptions = (text: string): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text }),
});

const parseResponse = async (response: Response) => {
  const responseBody: unknown = await response.json();
  const colorResult = createColorResult(responseBody);

  return response.ok && colorResult
    ? colorResult
    : Promise.reject(new Error("色を取得できませんでした。"));
};

export const fetchColorFromText = async (text: string, endpoint: string) => {
  const response = await fetch(endpoint, createRequestOptions(text));

  return parseResponse(response);
};
