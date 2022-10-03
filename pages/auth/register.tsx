import { useMutation } from '@apollo/client';
import Link from 'next/link';
import Router from 'next/router';
import { memo, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import Button from '../../components/Common/Button';
import { REGISTER_USER } from '../../graphql/users/mutations';
import useAuthStore from '../../store/authStore';
import { RegisterState } from '../../types/authTypes';
import { BLUE, DARK_PURPLE, NORMAL_PURPLE } from '../../utils/constants';
import { useForm } from '../../utils/hooks/useForm';


// USE FORM INITIAL STATE
const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

///////////////////////
// REGISTER PAGE //////
///////////////////////

const RegisterPage = () => {

    //////////////
    // ZUSTAND ///
    //////////////

    const { addUser } = useAuthStore();

    //////////////
    // STATE /////
    //////////////

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        message: '',
    });

    // CUSTOM FORM HOOK

    const {
        onChange,
        onSubmit,
        values
    } = useForm(registerUser, initialState);

    //////////////////////////
    // MUTATION //////////////
    //////////////////////////

    const [addUserMutation, { loading }] = useMutation(
        // MUTATION
        REGISTER_USER,
        // OPTIONS
        {
            update(proxy, result) {
                // PUSH TO HOMEPAGE
                Router.push("/");
               
                // CALL ZUSTAND ACTION
                addUser(result.data.registerUser);
            },

            // IF ERROR
            onError(err) {
                
                // SET ERRORS
                setErrors((prevErrors) => {
                    return {
                        ...prevErrors,
                        ...err.graphQLErrors[0]?.extensions.errors as RegisterState,
                        message: err.graphQLErrors[0].message.length > 0 ? err.graphQLErrors[0].message : '',
                    }
                });
            },
            variables: {
                ...values,
            }
        },
    );

    //////////////////////////
    // FUNCTION //////////////
    //////////////////////////

    async function registerUser() {
        await addUserMutation();
    }

    //////////////
    // RENDER ////
    //////////////

    return (
        <div className='flex flex-col justify-start items-center relative'>

            {/* IF LOADING */}
            {
                loading &&
                <div className="top-0 left-0 absolute backdrop-blur-[2px] flex justify-center items-center w-full h-full">

                    {/* SPINNER */}
                    <Circles
                        color={NORMAL_PURPLE}
                        height={150}
                        width={150}
                    />

                </div>
            }

            {/* REGISTER TITLE */}
            <span
                className="w-full text-center font-bold text-[40px] text-gray-600 mt-[120px]"
            >
                Register
            </span>

            {/* REGISTER TABLE */}

            <div className="w-[80%] border rounded-lg shadow-lg border-gray-300 mt-5 flex flex-col p-7">

                {/* LABEL FOR USERNAME */}
                <span className="text-[#66b5ff] ">Username</span>
                {/* USERNAME */}
                <input type="text" placeholder="Enter username..." maxLength={50}
                    className={`border-b-2 py-3 px-2  focus:outline-none ${errors.username.length > 0 ? "border-b-red-400" : ""}`} name="username" onChange={onChange}
                />

                {/* IF ERROR MAKE BORDER RED */}
                {
                    errors.username.length > 0 ?
                        <span className="text-red-400 mt-3 text-sm">
                            {errors.username}
                        </span>
                        : null}


                {/* LABEL FOR EMAIL */}
                <span className="text-[#66b5ff] mt-3">Email</span>
                {/* EMAIL */}
                <input type="email" placeholder="Enter email..." maxLength={50}
                    className={`border-b-2 py-3 px-2  focus:outline-none ${errors.email.length > 0 ? "border-b-red-400" : ""}`} name="email" onChange={onChange}
                />

                {/* IF ERROR SHOW EMAIL ERROR */}
                {
                    errors.email.length > 0 ?
                        <span className="text-red-400 mt-3 text-sm">
                            {errors.email}
                        </span>
                        : null}


                {/* LABEL FOR PASSWORD */}
                <span className="text-[#66b5ff] mt-3">Password</span>
                {/* EMAIL */}
                <input type="password" placeholder="Enter password..." maxLength={50}
                    className={`border-b-2 py-3 px-2  focus:outline-none ${errors.password.length > 0 ? "border-b-red-400" : ""}`} name="password" onChange={onChange}
                />

                {/* IF ERROR SHOW PASSWORD ERROR */}
                {
                    errors.password.length > 0 ?
                        <span className='text-red-400 mt-3 text-sm'>
                            {errors.password}
                        </span>
                        : null}

                {/* LABEL FOR CONFIRM PASSWORD */}
                <span className="text-[#66b5ff] mt-3">Confirm Password</span>
                {/* EMAIL */}
                <input type="password" placeholder="Confirm password..." maxLength={50}
                    className={`border-b-2 py-3 px-2  focus:outline-none ${errors.confirmPassword && errors.confirmPassword.length > 0 ? "border-b-red-400" : ""}`} name="confirmPassword" onChange={onChange}
                />

                {/* IF ERROR SHOW CONFIRM PASSWORD ERROR */}
                {
                    errors.confirmPassword && errors.confirmPassword.length > 0 ?
                        <span className='text-red-400 mt-3 text-sm'>
                            {errors.confirmPassword}
                        </span>
                        : null}

                {/* REGISTER BTN! */}
                <Button
                    onClick={onSubmit}
                    txt="Register"
                    btnCss={`border transition text-white hover:scale-105 hover:shadow-lg w-[20%] bg-[${NORMAL_PURPLE}] m-auto min-w-[80px] mt-5 p-3 rounded-lg hover:bg-[${DARK_PURPLE}] hover:border-[color:var(--main-blue)]`}
                />

<div className="m-auto mt-5 flex justify-center items-center">
                    <span className='text-gray-400 text-sm'>Already have an account?</span>

                    <Link href="/auth/login">
                        <span 
                            className={`cursor-pointer font-bold ml-3 text-sm text-[${BLUE}]
                                hover:scale-[1.05] transition
                            `}
                        >Login here</span>
                    </Link>
                </div>    
            </div>

            {
                errors.message.length > 0 ?
                <span className='text-red-400 mt-5 text-sm font-bold'>
                    {errors.message}
                </span>
            :null}
            
        </div>
    );
};

export default memo(RegisterPage);
