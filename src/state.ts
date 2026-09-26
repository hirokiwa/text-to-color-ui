import type { ConverterElements } from "./dom";
import type { ConverterState } from "./types";

const getMessage = (state: ConverterState) =>
  state.status === "error" ? state.message : "";

const getResult = (state: ConverterState) =>
  state.status === "success" ? state.color : "";

const getSubmitLabel = (state: ConverterState) =>
  state.status === "loading" ? "色を探しています" : "色にする";

const applyColorTheme = (
  elements: ConverterElements,
  state: ConverterState,
) => {
  state.status === "success"
    ? [
        elements.page.style.setProperty("--page-color", state.color),
        elements.page.style.setProperty(
          "--foreground-color",
          state.foregroundColor,
        ),
        elements.themeColor.setAttribute("content", state.color),
      ]
    : [];
};

export const renderConverterState = (
  elements: ConverterElements,
  state: ConverterState,
) => {
  const isLoading = state.status === "loading";

  elements.submit.disabled = isLoading;
  elements.input.readOnly = isLoading;
  elements.form.setAttribute("aria-busy", `${isLoading}`);
  elements.submitLabel.textContent = getSubmitLabel(state);
  elements.result.textContent = getResult(state);
  elements.message.textContent = getMessage(state);
  applyColorTheme(elements, state);
};
