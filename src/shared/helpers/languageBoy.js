export const LANG_KEY = "@language-coin";
export const getLang = () => localStorage.getItem(LANG_KEY) !== null ? localStorage.getItem(LANG_KEY) : "pt_br" ;

export const toggleLang = lang => {
  localStorage.setItem(LANG_KEY, lang);
};
