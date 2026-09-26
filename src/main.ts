import { fetchColorFromText } from "./api";
import { getAccessibleForegroundColor } from "./color";
import { getConverterElements } from "./dom";
import { renderConverterState } from "./state";

const EMPTY_INPUT_MESSAGE = "言葉を入力してください。";
const REQUEST_ERROR_MESSAGE = "色を取得できませんでした。もう一度お試しください。";

const elements = getConverterElements();

const createSuccessState = (color: string) => ({
  status: "success" as const,
  color,
  foregroundColor: getAccessibleForegroundColor(color),
});

const getInputText = () => elements.input.value.trim();

const submitText = async (text: string) => {
  renderConverterState(elements, { status: "loading" });

  try {
    const colorResult = await fetchColorFromText(text);
    renderConverterState(elements, createSuccessState(colorResult.hex));
  } catch {
    renderConverterState(elements, {
      status: "error",
      message: REQUEST_ERROR_MESSAGE,
    });
  }
};

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const text = getInputText();

  return text.length > 0
    ? submitText(text)
    : renderConverterState(elements, {
        status: "error",
        message: EMPTY_INPUT_MESSAGE,
      });
};

elements.form.addEventListener("submit", handleSubmit);
renderConverterState(elements, { status: "idle" });
