export type ColorResult = Readonly<{
  hex: string;
}>;

export type ConverterState =
  | Readonly<{ status: "idle" }>
  | Readonly<{ status: "loading" }>
  | Readonly<{ status: "success"; color: string; foregroundColor: string }>
  | Readonly<{ status: "error"; message: string }>;
