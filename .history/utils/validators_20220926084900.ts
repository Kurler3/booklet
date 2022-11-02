import { EMAIL_REGEX } from "./constants";

interface LooseObject {
    [key: string]:any,
}

export const validateRegisterInput = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
) => {
    let errors:LooseObject = {};

    // IF USERNAME IS EMPTY
    if(username.trim() === "") {
        errors.username = "Username must not be empty";
    }

    // IF EMAIL IS EMPTY
    if(email.trim() === "") {
        errors.email = "Email must not be empty";
    }
    // ELSE IF DOES NOT MATCH THE EMAIL REGEX
    else if(!email.match(EMAIL_REGEX)) {    
        errors.email = "Email must be a valid email address";
    }

    // PASSWORD
    if(password === "") {
        errors.password = "Password must not be empty";
        errors.confirmPassword = "Password must not be empty";
    }
    // IF NOT THE SAME AS THE CONFIRM PASSWORD
    else if(password!==confirmPassword) {
        errors.password= "Passwords must match";
        errors.confirmPassword = "Passwords must match";
    }


    return {
        errors,
        // IF NO KEYS, THEN VALID IS TRUE ELSE IS FALSE
        valid: Object.keys(errors).length === 0
    }
}
