import { toast } from "react-toastify";
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