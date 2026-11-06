import {
  readSupportLanguage,
  supportLanguageKey,
  type PreferenceStorage,
} from "@automaticity/learning-core/automaticity";
import {
  isGrammarSupportLanguage,
  type GrammarSupportLanguage,
} from "./grammar-learning-coach";

export const grammarLegacyLanguageKey = "deutschflow:honovr-language";

export function resolveGrammarSupportLanguage(
  storage: Pick<PreferenceStorage, "getItem">,
): GrammarSupportLanguage {
  try {
    if (storage.getItem(supportLanguageKey("de")) !== null)
      return readSupportLanguage("de", storage);
    const legacy = storage.getItem(grammarLegacyLanguageKey);
    return isGrammarSupportLanguage(legacy) ? legacy : "fa";
  } catch {
    return "fa";
  }
}
