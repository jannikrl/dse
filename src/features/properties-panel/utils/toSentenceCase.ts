export const toSentenceCase = (input: string) =>
  input.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
