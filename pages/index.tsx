import type { NextPage } from 'next';
import { IUser } from '../types/userTypes';
import Link from 'next/link';
import {
  BiLogIn
} from 'react-icons/bi';
import {
  VscAccount
} from 'react-icons/vsc';


interface IProps {
  userProfile: IUser | null;
}

// GET ALL USERS TEST 
export async function getServerSideProps() {

  // const {data} = await apolloClient.query({
  //   query: getAllUsersQuery
  // });

  // console.log('Data: ', data);
  return {
    props: {

    }
  }
  // return {
  //   props: {
  //     allUsers:
  //   }
  // }
}

const Home: NextPage<IProps> = ({
  userProfile,
}) => {

  return (
    <div className='flex-1 h-full flex items-center justify-center'>

      {
        !userProfile ?

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

          :
          <div>Logged in!</div>
      }

    </div>
  )
}

export default Home
