import type { Language } from "./contracts";

/** Keep every character, while giving Persian and Latin text their own direction. */
export function promptTextParts(text: string, language: Language) {
  const hasPersian = (value: string) => /[\p{Script=Arabic}]/u.test(value);
  const separator = text.indexOf(": ");
  const sections =
    separator >= 0 && separator + 2 < text.length
      ? [
          { value: text.slice(0, separator + 2), breakBefore: false },
          { value: text.slice(separator + 2), breakBefore: true },
        ]
      : [{ value: text, breakBefore: false }];
  return sections.flatMap(({ value, breakBefore }) => {
    const parts = hasPersian(value)
      ? value.split(
          /([\p{Script=Latin}][\p{Script=Latin}\p{M}\p{N}\s.,!?;:'"„“”’()/_—–-]*)/gu,
        )
      : [value];
    return parts.filter(Boolean).map((part, index) => ({
      text: part,
      lang: hasPersian(part) ? "fa" : language,
      dir: hasPersian(part) ? "rtl" : "ltr",
      breakBefore: breakBefore && index === 0,
    }));
  });
}
