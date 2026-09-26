const getRequiredElement = <ElementType extends Element>(
  selector: string,
  elementType: { new (): ElementType },
) => {
  const element = document.querySelector(selector);

  return element instanceof elementType
    ? element
    : (() => {
        throw new Error(`Element not found: ${selector}`);
      })();
};

export const getConverterElements = () => ({
  page: getRequiredElement(".page", HTMLBodyElement),
  form: getRequiredElement(".color-converter__form", HTMLFormElement),
  input: getRequiredElement(".color-converter__input", HTMLTextAreaElement),
  result: getRequiredElement(".color-converter__result", HTMLOutputElement),
  message: getRequiredElement(".color-converter__message", HTMLParagraphElement),
  themeColor: getRequiredElement('meta[name="theme-color"]', HTMLMetaElement),
});

export type ConverterElements = ReturnType<typeof getConverterElements>;
