// REF: https://github.com/denysdovhan/vacuum-card/blob/main/src/localize.ts

// Sorted alphabetically
import * as cs from './translations/cs.json';
import * as en from './translations/en.json';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const languages: Record<string, Translations> = {
  cs,
  en,
};

const DEFAULT_LANG = 'en';

export default function localize(
  str: string,
  search?: string,
  replace?: string,
): string | undefined {
  const [section, key] = str.toLowerCase().split('.');

  let langStored: string | null = null;

  try {
    langStored = JSON.parse(localStorage.getItem('selectedLanguage') ?? '');
  } catch (e) {
    langStored = localStorage.getItem('selectedLanguage');
  }

  const lang = (langStored || navigator.language.split('-')[0] || DEFAULT_LANG)
    .replace(/['"]+/g, '')
    .replace('-', '_');

  let translated: string | undefined;

  try {
    translated = languages[lang][section][key];
  } catch (e) {
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    return;
  }

  if (search && replace) {
    translated = translated?.replace(search, replace);
  }

  return translated;
}