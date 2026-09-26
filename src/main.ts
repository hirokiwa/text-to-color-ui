import { fetchColorFromText } from "./api";
import { getAccessibleForegroundColor } from "./color";
import { getConverterElements } from "./dom";
import { renderConverterState } from "./state";

const EMPTY_INPUT_MESSAGE = "言葉を入力してください。";
const REQUEST_ERROR_MESSAGE = "色を取得できませんでした。もう一度お試しください。";
const AUTOMATIC_SUBMISSION_DELAY_MILLISECONDS = 1000;

const elements = getConverterElements();
const automaticSubmission = {
  timeoutIdentifier: undefined as number | undefined,
};

const createSuccessState = (color: string) => ({
  status: "success" as const,
  color,
  foregroundColor: getAccessibleForegroundColor(color),
});

const getInputText = () => elements.input.value.trim();

const cancelAutomaticSubmission = () => {
  window.clearTimeout(automaticSubmission.timeoutIdentifier);
  automaticSubmission.timeoutIdentifier = undefined;
};

const submitAutomatically = () => {
  automaticSubmission.timeoutIdentifier = undefined;
  elements.form.requestSubmit();
};

const scheduleAutomaticSubmission = () => {
  cancelAutomaticSubmission();
  automaticSubmission.timeoutIdentifier = window.setTimeout(
    submitAutomatically,
    AUTOMATIC_SUBMISSION_DELAY_MILLISECONDS,
  );
};

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
  cancelAutomaticSubmission();
  const text = getInputText();

  return text.length > 0
    ? submitText(text)
    : renderConverterState(elements, {
        status: "error",
        message: EMPTY_INPUT_MESSAGE,
      });
};

const handleInput = () => {
  const text = getInputText();
  renderConverterState(elements, { status: "idle" });

  return text.length > 0
    ? scheduleAutomaticSubmission()
    : cancelAutomaticSubmission();
};

elements.form.addEventListener("submit", handleSubmit);
elements.input.addEventListener("input", handleInput);
renderConverterState(elements, { status: "idle" });
