
import {THEME_KEY} from '../../shared/helpers/themeBoy'
export const TOKEN_KEY = "@wb-coin";

export const PROFILE_KEY = "@wb-profile-coin";


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setUser = (user) => localStorage.setItem(PROFILE_KEY,JSON.stringify(user))
export const getUser = () => JSON.parse(localStorage.getItem(PROFILE_KEY))

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE_KEY);
};
