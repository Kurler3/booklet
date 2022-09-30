import {
    AiOutlineMenu
} from 'react-icons/ai';

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USER_TOKEN = "LOCAL_USER_TOKEN";

export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PROD_BASE_URL;


// DARK PURPLE STRING
export const DARK_PURPLE = "#0d1033";

// NORMAL PURPLE
export const NORMAL_PURPLE = "#3b4eff";

// BLUE
export const BLUE = "#66b5ff";