import { useMutation } from '@apollo/client';
import Link from 'next/link';
import Router from 'next/router';
import {memo, useState} from 'react';
import { Circles } from 'react-loader-spinner';
import Button from '../../components/Common/Button';
import { LOGIN_USER } from '../../graphql/users/mutations';
import useAuthStore from '../../store/authStore';
import { LoginState } from '../../types/authTypes';
import { BLUE, DARK_PURPLE, NORMAL_PURPLE } from '../../utils/constants';
import { useForm } from '../../utils/hooks/useForm';


// INITIAL STATE FOR useForm HOOK
const initialState = {
    username: '',
    password: '',
};

/////////////////
// LOGIN PAGE ///
/////////////////

const LoginPage = () => {

    /////////////
    // ZUSTAND //
    /////////////
    
    const {addUser} = useAuthStore();

    ////////////////
    // STATE/HOOK //
    ////////////////

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: '',
    });

    const {onChange, onSubmit, values} = useForm(login, initialState);
 
    /////////////.
    // MUTATION //
    //////////////
  
    const [loginUserMutation, {loading}] = useMutation(
        // MUTATION 
        LOGIN_USER,
        // OPTIONS
        {
            // EVERYTHING GOOD
            update(proxy, result) {
                Router.push('/');

                // CALL ADD USER FUNCTION ON ZUSTAND
                addUser(result.data.loginUser);
            },
            // ON ERROR
            onError(err) {
               
                setErrors((prevErrors) => {
                    return {
                        ...prevErrors,
                        ...err.graphQLErrors[0]?.extensions,
                    }
                })
            },
            // VARIABLES
            variables: {
                ...values,
            }
        }
    );

    ///////////////
    // FUNCTIONS //
    ///////////////

    async function login() {
        try {
            await loginUserMutation();
        } catch (error) {
            console.log('Something bad happened while logging in...', error);
        }
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

            {/* LOGIN TITLE */}
            <span
                className="w-full text-center font-bold text-[40px] text-gray-600 mt-[120px]"
            >
                Login
            </span>

            {/* LOGIN FORM */}
            <div
                className='w-[80%] border rounded-lg shadow-lg border-gray-300 mt-5 flex flex-col p-7'
            >
                {/* LABEL FOR USERNAME */}
                <span className='text-[#66b5ff] font-semibold mb-2'>Username</span>
                {/* USERNAME INPUT */}
                <input 
                    type="text" placeholder="Enter username..." maxLength={50} 
                    className={`border-b-2 py-3 px-2 focus:outline-none ${errors.username.length > 0 ? "border-b-red-400" : ""}`} name="username" onChange={onChange}
                />
                
                 {/* IF ERROR MAKE BORDER RED */}
                 {
                    errors.username.length > 0 ?
                        <span className="text-red-400 mt-3 text-sm">
                            {errors.username}
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

                
                {/* REGISTER BTN! */}
                <Button
                    onClick={onSubmit}
                    icon="login"
                    txt="Login"
                    txtCss='ml-3 font-semibold'
                    btnCss={`border transition text-white hover:scale-105 hover:shadow-lg w-[20%] bg-[${NORMAL_PURPLE}] m-auto min-w-[80px] mt-5 p-3 rounded-lg hover:bg-[${DARK_PURPLE}] hover:border-[color:var(--main-blue)]`}
                />
                

                <div className="m-auto mt-5 flex justify-center items-center">
                    <span className='text-gray-400 text-sm'>Don&apos;t have an account?</span>

                    <Link href="/auth/register">
                        <span 
                            className={`cursor-pointer font-bold ml-3 text-sm text-[${BLUE}]
                                hover:scale-[1.05] transition
                            `}
                        >Register here</span>
                    </Link>
                </div>

            </div>

            {
                errors.general ? 
                <span
                    className='text-red-400 mt-3 text-md font-bold'
                >   
                    {errors.general}
                </span>
            :null}
        </div>
    );
};

export default memo(LoginPage);

