import {
    AiOutlineMenu
} from 'react-icons/ai';

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USER_TOKEN = "LOCAL_USER_TOKEN";

export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PROD_BASE_URL;


// // LEFT SIDE BAR MENU BUTTONS
// export const LEFT_SIDE_BAR_MENU_BUTTONS = [
//     // HOME BUTTON
//     // {
//     //     id: 'home',
//     //     label: 'Home',
//     // },
//     // // CHANGE LIBRARY
//     // {
//     //     id: 'change_library',
//     //     label: 'Change Library',
//     //     icon: 
//     // }

// ]