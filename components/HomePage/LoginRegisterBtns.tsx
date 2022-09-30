import { memo } from 'react';
import Link from 'next/link';
import { VscAccount } from 'react-icons/vsc';
import { BiLogIn } from 'react-icons/bi';


const LoginRegisterBtns = () => {


    return (
        <div className='p-2 mb-20 flex flex-col items-center justify-center gap-8'>
            <Link href="/auth/login">

                <div
                    className='w-[200px] gap-4 text-[25px] font-semibold flex items-center justify-center bg-[#3b4eff] p-2 rounded-lg
                      hover:shadow-xl hover:scale-[1.1] cursor-pointer transition hover:text-white text-white
                    '
                >
                    <BiLogIn />
                    <span>Login</span>
                </div>

            </Link>

            <Link href="/auth/register">

                <div
                    className='w-[130px] gap-4 text-[18px] flex items-center justify-center bg-[#0d1033] p-2 rounded-lg
                     hover:shadow-xl hover:scale-[1.1] cursor-pointer transition hover:text-white text-white
                    '
                >

                    <VscAccount />

                    <span className=''>Register</span>
                </div>

            </Link>
        </div>
    );
};

export default memo(LoginRegisterBtns);
