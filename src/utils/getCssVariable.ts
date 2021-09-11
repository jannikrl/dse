export const getCssVariable = (name: string) =>
  getComputedStyle(document.body).getPropertyValue(name);
