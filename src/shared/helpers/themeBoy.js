export const THEME_KEY = "@theme-coin";
export const getTheme = () => localStorage.getItem(THEME_KEY) !== null ? localStorage.getItem(THEME_KEY) : "theme-light" ;

export const toggleTheme = theme => {
  localStorage.setItem(THEME_KEY, theme);
};
