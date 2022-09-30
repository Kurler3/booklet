import { useMutation } from '@apollo/client';
import Router from 'next/router';
import {memo, useState} from 'react';
import { LOGIN_USER } from '../../graphql/users/mutations';
import useAuthStore from '../../store/authStore';
import { LoginState } from '../../types/authTypes';
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
                        ...err.graphQLErrors[0]?.extensions.errors as LoginState,
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
        <div>
            LOGIN
        </div>
    );
};

export default memo(LoginPage);

