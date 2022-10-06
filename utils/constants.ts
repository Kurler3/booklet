import {
    AiOutlineMenu
} from 'react-icons/ai';
import { toast } from 'react-toastify';

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USER_TOKEN = "LOCAL_USER_TOKEN";

export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PROD_BASE_URL;


// DARK PURPLE STRING
export const DARK_PURPLE = "#0d1033";

// NORMAL PURPLE
export const NORMAL_PURPLE = "#3b4eff";

// BLUE
export const BLUE = "#66b5ff";

// BTN BLUE
export const BTN_BLUE = "#3f87f2";

// COLOR GOOD
export const COLOR_GOOD = "#1ac41c";

// TOAST OPTIONS
export const TOAST_TYPE_OPTIONS = {
    info: 'INFO',
    success: 'SUCCESS',
    warning: 'WARNING',
    error: "ERROR",
    default: "DEFAULT",
}

// TOAST SECOND ARGUMENT
export const TOAST_SECOND_ARGUMENT = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
}

// MENU OPTIONS
export const MENU_OPTIONS = {
    home: 'HOME',
    issueRequests: 'ISSUE_REQUESTS',
    changeLibrary: 'CHANGE_LIBRARY',
}

// TOOLTIP POSITIONS
export const TOOLTIP_POSITION = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
}