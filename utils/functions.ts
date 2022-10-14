import { toast } from "react-toastify";
import { ILibrary } from "../types/libraryTypes";
import { TOAST_SECOND_ARGUMENT, TOAST_TYPE_OPTIONS } from "./constants";


// FUNCTION TO DISPLAY TOAST
export const showToast = (
    // TOAST TYPE (FROM CONSTANTS)
    toastType:string,
    // TOAST MESSAGE
    message:string,
) => {
    switch(toastType) {
        case TOAST_TYPE_OPTIONS.info:
            toast.info(message, TOAST_SECOND_ARGUMENT);
            break;
        case TOAST_TYPE_OPTIONS.success:
            toast.success(message, TOAST_SECOND_ARGUMENT);
            break;
        case TOAST_TYPE_OPTIONS.warning:
            toast.warn(message, TOAST_SECOND_ARGUMENT);
            break;
        case TOAST_TYPE_OPTIONS.error:
            toast.error(message, TOAST_SECOND_ARGUMENT);
            break;
        default:
            toast(
                message,
                TOAST_SECOND_ARGUMENT,
            );
    }
}


// SORT LIBRARIES BY ADMIN -> LIBRARIAN -> NOT ENROLLED ROLES GIVEN A USER ID
export const FUNC_SORT_LIBRARIES_BY_USER_ROLE = (
    libraries: ILibrary[],
    userId: string,
) => {

    let adminLibraries = [];
    let librarianLibraries = [];
    let notEnrolledLibraries = [];


    for(let library of libraries) {
        
        if(library.admins.includes(userId)) {
            adminLibraries.push(library);
        }
        else if(library.librarians.includes(userId)) {
            librarianLibraries.push(library);
        }
        else {
            notEnrolledLibraries.push(library);
        }
    }

    return [
        ...adminLibraries,
        ...librarianLibraries,
        ...notEnrolledLibraries,
    ];
}